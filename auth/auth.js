const jwt= require('jsonwebtoken')
require('dotenv').config()

const secret= process.env.SECRET_ID

const authenticate= (req,res,next)=>{
    const authheader= req.header.authorisation
    if(!authheader){
        return res.status(401).send("no token headers")
        
    }
    const token= authheader.split(" ")[1]
    jwt.verify(token,secret,(err, decoded)=>{
        if(err){
            res.status(401).send("token is invalid now")
        }
        console.log(decoded)
        next()
    })
}

module.exports={authenticate}