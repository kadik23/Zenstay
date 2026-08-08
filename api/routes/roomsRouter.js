import {Router} from 'express'
import Room from "../models/Room.js";
import Booking from '../models/Booking.js';
import Notification from '../models/Notification.js';
import { loginMiddleware } from '../middleware/loginMiddleware.js';
import mongoose from 'mongoose';
const router  = Router()

let clients = [];

router.get('/notifications/stream', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    clients.push(res);

    req.on('close', () => {
        clients = clients.filter(client => client !== res);
    });
});

router.get('/notifications', async (req, res) => {
    try {
        const notifs = await Notification.find().sort({ createdAt: -1 }).limit(50);
        res.json(notifs);
    } catch(err) {
        res.status(500).json(err);
    }
});

const dispatchNotification = async (type, message, details) => {
    try {
        const notif = await Notification.create({ type, message, details });
        const data = `data: ${JSON.stringify(notif)}\n\n`;
        clients.forEach(client => client.write(data));
    } catch(e) {
        console.error("Error saving notification", e);
    }
};

router.get('/getAllRooms',async(req,res)=>{
    try{
        const rooms = await Room.find()
        res.json(rooms)
    }catch(e){
        res.status(500).json('Internal Server Error')
    }
})

router.post('/getDashboardRooms', async (req, res) => {
    try {
        const { searchName, startDate, endDate } = req.body;
        
        let baseMatch = {};
        if (searchName) {
            baseMatch.name = { $regex: searchName, $options: 'i' };
        }
        
        if (startDate && endDate) {
            const overlappingBookings = await Booking.find({
                status: { $nin: ['rejected', 'cancelled'] },
                check_in: { $lt: endDate },
                check_out: { $gt: startDate }
            });
            const bookedRoomIds = overlappingBookings.map(b => b.room_id).filter(id => id);
            
            if (bookedRoomIds.length > 0) {
                const objectIdArray = bookedRoomIds
                    .filter(id => mongoose.Types.ObjectId.isValid(id))
                    .map(id => new mongoose.Types.ObjectId(id));
                    
                if (objectIdArray.length > 0) {
                    baseMatch._id = { $nin: objectIdArray };
                }
            }
        }

        const availableRoomsQuery = Room.find(baseMatch).limit(3);
        
        const popularRoomsQuery = Room.aggregate([
            { $match: baseMatch },
            { $addFields: { roomIdStr: { $toString: "$_id" } } },
            { $lookup: {
                from: "bookings",
                localField: "roomIdStr",
                foreignField: "room_id",
                as: "bookingsList"
            }},
            { $addFields: { bookingCount: { $size: "$bookingsList" } } },
            { $sort: { bookingCount: -1 } },
            { $limit: 4 },
            { $project: { bookingsList: 0, roomIdStr: 0, bookingCount: 0 } }
        ]);

        const specialOfferRoomsQuery = Room.aggregate([
            { $match: baseMatch },
            { $addFields: {
                score: {
                    $add: [
                        { $cond: [{ $eq: ["$air_conditioning", true] }, 3, 0] },
                        { $cond: [{ $eq: ["$bathrrom", true] }, 2, 0] },
                        { $cond: [{ $eq: ["$key_card_access", true] }, 2, 0] },
                        { $cond: [{ $eq: ["$free_wifi", true] }, 1, 0] },
                        { $cond: [{ $eq: ["$smart_tv", true] }, 1, 0] }
                    ]
                }
            }},
            { $sort: { score: -1 } },
            { $limit: 4 },
            { $project: { score: 0 } }
        ]);

        const [availableRooms, popularRooms, specialOfferRooms] = await Promise.all([
            availableRoomsQuery,
            popularRoomsQuery,
            specialOfferRoomsQuery
        ]);

        res.json({
            availableRooms,
            popularRooms,
            specialOfferRooms
        });

    } catch (e) {
        console.error(e);
        res.status(500).json('Internal Server Error');
    }
});

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
        const { user_id, room_id,check_in,check_out, totalPrice } = req.body;
        const doc = await Booking.create({
            user_id, room_id, check_in, check_out, totalPrice
        })
        await dispatchNotification('CREATE_RESERVATION', `A new reservation was booked!`, doc);
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

router.delete('/cancel_reservation/:id',loginMiddleware,async(req,res)=>{
    try{
        const {id} = req.params
        const result = await Booking.findByIdAndDelete(id);
        console.log(id)
        if (result) {
            await dispatchNotification('CANCEL_RESERVATION', `A reservation was cancelled!`, { id });
            res.json({ message: "Deleted Successfully" });
        } else {
            res.status(404).json({ message: "Reservation not found" });
        }
        
    }catch(e){
        res.status(500).json('Internal Server Error' + e.message);
    }
})

export default router