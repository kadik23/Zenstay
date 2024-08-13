import mongoose from 'mongoose'    
const {Schema} = mongoose
const UserSchema = new Schema({
    email: {type: String , unique: true},
    username: String,
    firstname: String , 
    lastname: String , 
    location: String ,
    password: String,
    account_type: String,
    telephone: Number,
    date_of_birth: Object,
    nationality: String,
})



const UserModel = mongoose.model('User',UserSchema)

export default UserModel