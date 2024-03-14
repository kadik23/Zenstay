// const express = require("express")
import express from "express";
import cors from 'cors'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import fs from "fs";
import multer from "multer";
import mime from "mime-types";
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 3000
const url = process.env.MONGO_URL
mongoose.connect(url)

import routes from "./routes/index.mjs"

const app = express()
const corsOptions = {
    credentials: true,
    origin: 'http://127.0.0.1:5173', 
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

app.use(routes)



const photosMiddleware = multer({dest:'/upload'});
app.post('/upload_photos', photosMiddleware.array('photos', 10), async (req,res) => {
    const uploadedImages = [];
    for (let i = 0; i < req.files.length; i++) {
        const {path,originalname,mimetype} = req.files[i];
        const parts = originalname.split('.')
        const ext = parts[parts.length -1]
        const newPath = path + '.' + ext
        fs.renameSync(path,newPath)
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
