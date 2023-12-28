const mongoose = require('mongoose')    
const {schema} = mongoose
const UserSchema = new Schemm({
    name: String , 
    email: {type: String , unique: true},
    passsword: String,
    username: String,
    account_type: string
})

const userModel = mongoose.Model('User',UserSchema)

module.exports = userModel