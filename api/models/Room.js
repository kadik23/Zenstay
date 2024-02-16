const mongoose = require('mongoose')    
const {Schema} = mongoose
const RoomSchema = new Schema({
    name: String ,
    space: String,
    bed_type: String , 
    review_id: String , 
    price: String,
    status: String,
    places: String,

})

const RoomModel = mongoose.model('Room',RoomSchema)

module.exports = RoomModel