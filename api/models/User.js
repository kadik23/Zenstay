const mongoose = require('mongoose')    
const {Schema} = mongoose
const UserSchema = new Schema({
    email: {type: String , unique: true},
    username: String,
    firstname: String , 
    lastname: String , 
    password: String,
    account_type: String
})



const UserModel = mongoose.model('User',UserSchema)

module.exports = UserModel