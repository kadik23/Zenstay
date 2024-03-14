import {Router} from 'express'
import jwt from "jsonwebtoken";
import Room from "../models/Room.js";
import Booking from '../models/Booking.js';
const router  = Router()

const loginMiddleware = (req , res ,next) =>{
    const {token} = req.cookies
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        next()
    });
} 

router.get('/getAllRooms',async(req,res)=>{
    try{
        const rooms = await Room.find()
        res.json(rooms)
    }catch(e){
        res.status(500).json('Internal Server Error')
    }
})

router.post('/getRoomsBySearch/:bed_type',async(req,res)=>{
    try{
        const bed_type = req.params.bed_type;
        const rooms = await Room.find({ bed_type: bed_type })
        res.json(rooms)
    }catch(e){
        res.status(500).json('Internal Server Error')
    } 
})

router.get('/getOneRoom/:id',async(req,res)=>{
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

router.post('/room_post',loginMiddleware,async(req, res)=>{
    try{
        let {name,space,bed_type,price,places} = req.body
            const doc = {name : name,space:space,bed_type:bed_type,viewers:0,price:price,places:places}
            const room = await Room.create(doc)
            if(!room){
                return res.status(404).json({ error: 'Room not found' });
            }
            res.json(room)
    }catch(e){
        res.status(500).json('Internal Server Error'+e)
    }
})

router.post('/booking_room',loginMiddleware, async (req, res) => {
    try{
        const { userID, roomID,checkIn,checkOut } = req.body;
        const doc = await Booking.create({
            user_id: userID,room_id: roomID,check_in:checkIn,check_out:checkOut
        })
        res.json(doc);
       
    } catch(err){
        res.status(500).json('Internal Server Error' + err);
    }
});



router.put('/update_room',async(req,res)=>{
    try{
        const {
            _id, name, space,bed_type,price,places
        } = req.body;
        const updateRoom = await Room.findById(_id);
        if (!(updateRoom))
        return   res.status(500).json('Internal Server Error'+req.body._id );
        await updateRoom.set({
            _id, name, space,bed_type,price,places
        }).save()
        return res.json(updateRoom)
    }catch(e){
        res.status(500).json('Internal Server Error' + e);
    }
})

router.delete('/delete_room',loginMiddleware,async(req,res)=>{
    try{
        const roomDoc = req.body
        const roomId = roomDoc._id
        await Room.findByIdAndDelete(roomId)
        res.json("Deleted Successfully")
    }catch(e){
        res.status(500).json('Internal Server Error' + e);
    }
})


router.get('/getOrders',async(req,res)=>{    
        let orders=await Booking.find();
        res.json(orders)
})

export default router