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
    
    let id= await admin.findOne({email:input.data.email})
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
//   router.use(authenticate)
router.post('/login', async (req,res)=>{
    let input = signup.safeParse(req.body)
    if(!input.success){
        res.json({alert:input.error})
        console.log(input.error)
        return;
    }
    let adminlogin= await admin.findOne({email:input.data.email,username:input.data.username,password:input.data.password})
    if(adminlogin){
        let token = jwt.sign({email:input.data.email},secret,{expiresIn:'1h'})
       res.status(400).json({message:`login successful ${input.data.username}`})
       console.log(token);

    }
    else{
        res.send("please check your username and password")
        console.log(adminlogin)
    } 
    
})
router.use(authenticate)
const admin_name=(req,res,next)=>{
    courseSchema.pre('save',function(next){
        this.instructor= req.admin._id,
        next();
    })
    next()
}
router.post('/courses',admin_name,async (req,res)=>{
    let new_course=new course(req.body)
    await new_course.save()
    res.send(`course created successfully courseID:${new_course._id}`)
})

// {
//     "course_title":"webdev",
//     "course_description":"full MERN stack",
//     "price":3999
// }






module.exports=router



