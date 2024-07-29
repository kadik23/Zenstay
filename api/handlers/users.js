import User from "../models/User.js";

export const userHandler = async(req,res)=>{
    let users=await User.find();
    res.json(users)
}