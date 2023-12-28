const express = require("express")
var cors = require('cors')
const { default: mongoose } = require("mongoose")
const User = require('module/User.js')
const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGO_URL)
require("dotenv").config()

const app = express()
app.use(cors({
    credentials:true,
    origin:'http://127.0.0.1:5173',
}))
app.use(express.json())

const bcryptSalt = bcrypt.genSaltSync(10);

app.get("/hello",(req,res)=>{

res.send("hello salah..")
})

app.post("/register",async (req,res)=>{

    const {username,firstName,lastname,email,password} = req.body
    const userDoc = await User.create({
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
        username
    })
    res.json({username,firstName,lastname,email,password})
})

app.listen(3000,()=>{
    console.log("hello im listening")
})