const express = require("express")
const cors = require('cors')
const { default: mongoose } = require("mongoose")
const User = require('./models/User.js')
const Room = require('./models/Room.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require("dotenv").config()
mongoose.connect(process.env.MONGO_URL)

const app = express()
const corsOptions = {
    credentials: true,
    origin: 'http://127.0.0.1:5173', 
};
app.use(cors(corsOptions));
app.use(express.json())

const bcryptSalt = bcrypt.genSaltSync(10);
const jwrSecret = 'sdjjfldwjn2vpbcwytp'

app.post("/register",async (req,res)=>{
    const {username,email,firstname,lastname,password} = req.body
    let account_type = 'Guest'
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
        res.status(500).json({ error: e.message });
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
            res.status(422).json('not found')
        }
    }catch(e){
        res.status(422).json(e)
    }
})

app.get('/getAllRooms',async(req,res)=>{
    try{
        const rooms = await Room.find()
        res.json(rooms)
    }catch(e){
        res.status(500).json('Internal Server Error')
    }
})

app.post('/getRoomsBySearch/:bed_type',async(req,res)=>{
    try{
        const bed_type = req.params.bed_type;
        const rooms = await Room.find({ bed_type: bed_type })
        res.json(rooms)
    }catch(e){
        res.status(500).json('Internal Server Error')
    } 
})

app.post('/getOneRoom/:id',async(req,res)=>{
    try{
        const roomId = req.params.id;
        const room = await Room.findById(roomId)
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json(room)
    }catch(e){
        res.status(500).json('Internal Server Error')
    }
})

app.post('/room_post',async(req, res)=>{
    try{
        // let userToken ;
        let {name,space,bed_type,price} = req.body
        const doc = {name : name,space:space,bed_type:bed_type,viewers:0,price:price}
        const room = await Room.create(doc)
        if(!room){
            return res.status(404).json({ error: 'Room not found' });
        }
        res.json(room)
    }catch(e){
        res.status(500).json('Internal Server Error'+e)
    }
})

app.get('*',async(req,res)=>{
    res.status(422).json('not found')
})

app.listen(3000,()=>{
    console.log("hello im listening")
})

//for learning
var http = require("http")
console.log(http)
http.createServer((req,res)=>{
    res.writeHead(200,"ok" .writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'text/plain',
    }))
    res.write("hello to port 100")
    res.end()
}).listen(101,"localhost",()=>{
    console.log("hello from 101")
})

var http2 = require("http")
console.log(http2)
http2.createServer((req,res)=>{
    res.writeHead(200,"ok" .writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'text/plain',
    }))
    res.end("hello to port 102")
}).listen(102,"localhost",()=>{
    console.log("hello from 102")
})

fs = require('fs')
// fs.appendFile("text.txt","hello from nodeJs",()=>{
//     console.log("file is created")
// })
fs.readFile("package.json","utf-8",function(er,data){
    console.log(data)
})

