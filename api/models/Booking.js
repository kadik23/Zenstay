const mongoose = require('mongoose')    
const {Schema} = mongoose
const BookingSchema = new Schema({
    user_id: String ,
    room_id:String,
    check_in: String,
    check_out: String,
    numberOfGuests: Number , 
})



const BookingModel = mongoose.model('Booking',BookingSchema)

module.exports = BookingModel