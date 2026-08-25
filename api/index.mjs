// const express = require("express")
import express from "express";
import cors from 'cors'
import cookieParser from "cookie-parser";
import fs from "fs";
import multer from "multer";
import dotenv from 'dotenv';
import {mongoose} from "mongoose"
import { fileURLToPath } from 'url';
import path from 'path';
import Stripe from 'stripe';
import Booking from './models/Booking.js';
import Transaction from './models/Transaction.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const port = process.env.PORT || 3000
const url = process.env.MONGO_URL
mongoose.connect(url)
import routes from "./routes/index.js"

const app = express()
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:5174', 'http://localhost:5173', 'https://zenstay-two.vercel.app'],
};
app.use(cors(corsOptions));

// Stripe webhook must be parsed as raw body
let stripe;
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    if (!stripe) stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // Update Transaction and Booking status
        await Transaction.findOneAndUpdate({ stripe_id: paymentIntent.id }, { status: 'succeeded' });
        const tx = await Transaction.findOne({ stripe_id: paymentIntent.id });
        if (tx && tx.booking_id) {
            await Booking.findByIdAndUpdate(tx.booking_id, { status: 'confirmed' });
        }
    }

    res.json({received: true});
});
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

app.use(routes)



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const photosMiddleware = multer({ dest: 'uploads/' });
app.post('/upload_photos', photosMiddleware.array('photos', 10), async (req,res) => {
    const uploadedImages = [];
    for (let i = 0; i < req.files.length; i++) {
        const {path: tempPath, originalname} = req.files[i];
        const parts = originalname.split('.')
        const ext = parts[parts.length -1]
        const newPath = tempPath + '.' + ext
        fs.renameSync(tempPath,newPath)
        uploadedImages.push(newPath.replace('uploads/',''));
    }
    res.json(uploadedImages);
});



app.get('*',async(req,res)=>{
    res.status(422).json('not found')
})
app.listen(port,()=>{
    console.log("hello im listening")
})
