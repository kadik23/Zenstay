import {Router} from 'express'
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { body, validationResult } from 'express-validator';

const router  = Router()
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sdjjfldwjn2vpbcwytp'
const loginMiddleware = (req , res ,next) =>{
    const {token} = req.cookies
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        next()
    });
} 

router.post("/register",
[
    body('password')
        .notEmpty()
        .isLength({min:8,max:16})
        .withMessage('must be at least 8-16 characters')
    ],
    async (req,res)=>{
        const result = validationResult(res)
        console.log(result)
        if(!result.isEmpty()){
            return res.status(400).send({errors:result.array()})
        }
        const {username,email,firstname,lastname,password} = req.body
        let account_type = 'Guest'
        try{
            let pass = bcrypt.hashSync(password, bcryptSalt)
            const userDoc = await User.create({
                email,
                username,
                firstname,
                lastname,
                password:pass,
                account_type,
            })
            res.json({username,firstname,lastname,email,password,account_type})
        }catch(e){
            res.status(500).json({ error: e.message });
        }  
})

router.post("/login",async(req,res)=>{
    const {email , password} = req.body 
    try{
        const userDoc = await User.findOne({email})
        if(userDoc){
            const passOk = bcrypt.compareSync(password,userDoc.password)
            if(passOk){
                jwt.sign({
                    email:userDoc.email,
                    id:userDoc._id
                },jwtSecret,{},(err,token)=>{
                    if(err) throw err
                    res.cookie('token',token,{maxAge:3600*60}).json(userDoc)
                })
            }else{
                res.status(422).json('pass not ok')
            }
        }else{
            res.status(422).json('not found')
        }
    }catch(e){
        res.status(422).json(e)
    }
})



router.put('/update_profile',loginMiddleware,async(req,res)=>{
    try{
        const {
            _id, email,username,account_type,telephone,
            date_of_birth
        } = req.body;
        const updateUser = await User.findById(_id);
        if (!(updateUser))
        return   res.status(500).json('Internal Server Error'+req.body._id );
        updateUser.set({
            _id,email,username,account_type,
            telephone ,date_of_birth 
        });
        await updateUser.save();
        return res.json(updateUser)
    }catch(e){
        res.status(500).json('Internal Server Error' + e);
    }
})

router.get('/getUsers',async(req,res)=>{
    let users=await User.find();
    res.json(users)
})

router.post('/logout', (req,res) => {
    res.cookie('token', '').json(true);
});

export default router