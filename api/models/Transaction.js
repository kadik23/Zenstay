import mongoose from 'mongoose'    
const {Schema} = mongoose
const TransactionSchema = new Schema({
    user_id: String,
    room_id: String,
    booking_id: String,
    stripe_id: String,
    amount: Number,
    currency: String,
    status: String // pending, succeeded, failed
}, { timestamps: true })

const TransactionModel = mongoose.model('Transaction', TransactionSchema)

export default TransactionModel
