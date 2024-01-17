const mongoose= require('mongoose')
const { string } = require('zod')

const adminschema = new mongoose.Schema({
    email:{
        type:String,
        unique: true,
        required: true
    },
    username:String,
    password:String,
    

})
const userschema = new mongoose.Schema({
    email:{
        type:String,
        unique: true,
        required: true
    },username:String,
    password:String,
    courseID:[{type:mongoose.Schema.Types.ObjectId, ref:'course'}]

})

const courseSchema= new mongoose.Schema({
    course_title:String,
    course_description:String,
    price:Number
    
})

const admin= mongoose.model("admin",adminschema)
const user= mongoose.model("user",userschema)
const course= mongoose.model("course", courseSchema)

module.exports={admin,user,course}