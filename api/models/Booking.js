import mongoose from 'mongoose'    
const {Schema} = mongoose
const BookingSchema = new Schema({
    user_id: String ,
    room_id:String,
    check_in: String,
    check_out: String,
    numberOfGuests: Number , 
    status: String ,// pending, confirmed, rejected, checked-in, checked-out
    review: Number
})



const BookingModel = mongoose.model('Booking',BookingSchema)

export default BookingModel