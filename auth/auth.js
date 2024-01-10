const jwt= require('jsonwebtoken')
require('dotenv').config()

const secret= process.env.SECRET_ID

const authenticate= (req,res,next)=>{
    const authheader= req.header.authorisation
    if(authheader){
        const token= authheader.split(" ")[1]
    }
}