const express = require("express")
const cors = require('cors')
const { default: mongoose } = require("mongoose")
const User = require('./models/User.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require("dotenv").config()
mongoose.connect(process.env.MONGO_URL)

const app = express()
app.use(cors({
    credentials:true,
    // origin:'http://127.0.0.1:5173',
}))
app.use(express.json())

const bcryptSalt = bcrypt.genSaltSync(10);
const jwrSecret = 'sdjjfldwjn2vpbcwytp'

app.get("/hello",(req,res)=>{
    res.send("hello salah..")
})

app.post("/register",async (req,res)=>{
    const {username,firstname,lastname,email,password,account_type} = req.body
    try{
        let pass = bcrypt.hashSync(password, bcryptSalt)
        const userDoc = await User.create({
            email,
            username,
            firstname,
            lastname,
            password:pass,
            account_type,
        })
        res.json({username,firstname,lastname,email,password,account_type})
    }catch(e){
        res.status(422).json(e)
    }  
})

app.post("/login",async(req,res)=>{
    const {email , password} = req.body 
    try{
        const userDoc = await User.findOne({email})
        if(userDoc){
            const passOk = bcrypt.compareSync(password,userDoc.password)
            if(passOk){
                jwt.sign({
                    email:userDoc.email,
                    id:userDoc._id
                },jwrSecret,{},(err,token)=>{
                    if(err) throw err
                    res.cookie('token',token).json(userDoc)
                })
            }else{
                res.status(422).json('pass not ok')
            }
        }else{
            res.json('not found')
        }
    }catch(e){
        res.status(422).json(e)
    }
})

app.listen(3000,()=>{
    console.log("hello im listening")
})