import mongoose from 'mongoose'    
const {Schema} = mongoose
const RoomSchema = new Schema({
    name: String ,
    space: String,
    bed_type: {
        type: String,
        enum: ['two bed', 'king size bed', 'single bed', 'queen size bed'],
        required: true
    }, 
    review_id: String , 
    images: [String],
    price: String,
    status: String,
    places: String,
    bathrrom: Boolean,
    bathroom: Boolean,
    key_card_access: Boolean,
    air_conditioning: Boolean,
    smart_tv: Boolean,
    free_wifi: Boolean,
    guests_number: String,
    rating: { type: Number, default: 0 },
    viewers: { type: Number, default: 0 },
})

const RoomModel = mongoose.model('Room',RoomSchema)

export default  RoomModel