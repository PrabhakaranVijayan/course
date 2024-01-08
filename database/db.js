const mongoose= require('mongoose')
require('dotenv').config()

const database= process.env.DB_CONNECT

mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("database connected")
})
.catch((err)=>{
    console.log("the error is "+err)
})