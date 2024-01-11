const express= require('express')
const zod= require('zod')
const jwt= require('jsonwebtoken')
const {secret,authenticate}= require('../auth/auth')
const router=express.Router()
const {admin, course}= require('../database/schema')

let signup= zod.object({
    email:zod.string().email(),
    username:zod.string(),
    password:zod.string().min(8).max(15)
})


router.post("/signup",async (req,res)=>{
    let input= signup.safeParse(req.body)
    if(!input.success){
        res.status(400).json({message:input.error})
        return;
    }
    let pass= input.data.password
    if(pass.length<8 || pass.length>15){
        res.status(400).send("password should be 8-15 characters")
        return;
    }
    let user= input.data.email
    let id= await admin.findOne({user})
    if(id){
        res.status(401).json({message:"already exist"})
        return;
    }
    else {
        let first= new admin(input.data)
        await first.save()
       
        let token= jwt.sign({username:input.data.username,password:input.data.password},secret,{expiresIn:'1h'})
        res.status(200).json({message:`account created successfully ${input.data.username}`,token})
    }
})









module.exports=router



