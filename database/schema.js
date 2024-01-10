const mongoose= require('mongoose')

const adminschema = new mongoose.Schema({
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:String

})
const userschema = new mongoose.Schema({
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:String,
    courseID:[{type:mongoose.Schema.Types.ObjectId, ref:'course'}]

})

const courseSchema= new mongoose.Schema({
    course_title:String,
    course_description:String,
    price:Number,
    instructor:{
        type:mongoose.model.Schema.ObjectId,
        ref:'admin'
    }
})

const admin= mongoose.model("admin",adminschema)
const user= mongoose.model("user",userschema)
const course= mongoose.model("course", courseSchema)

module.exports={admin,user,course}