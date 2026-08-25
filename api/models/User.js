import mongoose from 'mongoose'    
const {Schema} = mongoose
const UserSchema = new Schema({
    email: {type: String , unique: true},
    username: String,
    firstname: String , 
    lastname: String , 
    location: String ,
    password: { type: String, default: null },
    auth_provider: { type: String, default: 'email' },
    account_type: String,
    telephone: Number,
    date_of_birth: Object,
    nationality: String,
    image: String,
    stripe_customer_id: String
})



const UserModel = mongoose.model('User',UserSchema)

export default UserModel