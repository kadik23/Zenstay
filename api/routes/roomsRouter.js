import {Router} from 'express'
import Room from "../models/Room.js";
import Booking from '../models/Booking.js';
import { loginMiddleware } from '../middleware/loginMiddleware.js';
const router  = Router()

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
        const rooms = await Room.find({bed_type })
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
        const { user_id, room_id,check_in,check_out } = req.body;
        const doc = await Booking.create({
            user_id, room_id, check_in, check_out
        })
        res.status(200).json({"data":doc});
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

router.get('/getOrder',async(req,res)=>{    
    let orders=await Booking.find();
    res.json(orders)
})

router.get('/getBookedRoomById/:room_id', async(req,res)=>{
    try{
        let bookedRoom = await Booking.findOne(req.params);
        res.status(200).json({'data': bookedRoom})
    }catch(e){
        res.status(500).json('Internal Server Error' + e);
    }
})

export default router