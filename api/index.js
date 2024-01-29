const express = require("express")
const cors = require('cors')
const { default: mongoose } = require("mongoose")
const User = require('./models/User.js')
const Room = require('./models/Room.js')
const Booking = require('./models/Booking.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const fs = require('fs');
const multer = require('multer');
const mime = require('mime-types');
require("dotenv").config()
mongoose.connect(process.env.MONGO_URL)

const app = express()
const corsOptions = {
    credentials: true,
    origin: 'http://127.0.0.1:5173', 
};
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sdjjfldwjn2vpbcwytp'

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
                },jwtSecret,{},(err,token)=>{
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

app.get('/getOneRoom/:id',async(req,res)=>{
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
        const {token} = req.cookies
        let {name,space,bed_type,price} = req.body
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const doc = {name : name,space:space,bed_type:bed_type,viewers:0,price:price}
            const room = await Room.create(doc)
            if(!room){
                return res.status(404).json({ error: 'Room not found' });
            }
            res.json(room)
        });
    }catch(e){
        res.status(500).json('Internal Server Error'+e)
    }
})

app.post('/booking_room', async (req, res) => {
    try{
        const {token} = req.cookies
        const { userID, roomID,checkIn,checkOut } = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const doc = await Booking.create({
                user_id: userID,room_id: roomID,check_in:checkIn,check_out:checkOut
            })
                res.json(doc);
        });
    } catch(err){
        res.status(500).json('Internal Server Error' + err);
    }
});

app.put('/update_profile',async(req,res)=>{
    try{
        const {token} = req.cookies
        const {
            _id, email,username,account_type,telephone,
            date_of_birth
        } = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const updateUser = await User.findById(_id);
            if (!(updateUser))
            return   res.status(500).json('Internal Server Error'+req.body._id );
            updateUser.set({
                _id,email,username,account_type,
                telephone ,date_of_birth 
            });
            await updateUser.save();
            return res.json(updateUser)
        })
    }catch(e){
        res.status(500).json('Internal Server Error' + e);
    }
})


app.put('/update_room',async(req,res)=>{
    try{
        const {
            _id, name, space,bed_type,price,
        } = req.body;
        const {token} = req.cookies
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const updateRoom = await Room.findById(_id);
            if (!(updateRoom))
            return   res.status(500).json('Internal Server Error'+req.body._id );
            await updateRoom.set({
                _id, name, space,bed_type,price
            }).save()
            return res.json(updateRoom)
        })
    }catch(e){
        res.status(500).json('Internal Server Error' + e);
    }
})

app.delete('/delete_room',async(req,res)=>{
    try{
        const roomDoc = req.body
        const {token} = req.cookies
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const roomId = roomDoc._id
            await Room.findByIdAndDelete(roomId)
            res.json("Deleted Successfully")
        })
    }catch(e){
        res.status(500).json('Internal Server Error' + e);
    }
})

app.get('/getUsers',(req,res)=>{
    const {token} = req.cookies
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        let users=await User.find();
        res.json(users)
    })
})

app.get('/getOrders',(req,res)=>{
    const {token} = req.cookies
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        let orders=await Booking.find();
        res.json(orders)
    })
})

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

app.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
});

app.get('*',async(req,res)=>{
    res.status(422).json('not found')
})

app.listen(3000,()=>{
    console.log("hello im listening")
})
