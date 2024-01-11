const express = require('express')
const app = express()
require('dotenv').config();
const adminroute= require('./routes/admin')
app.use(express.json())
require('./database/db')


const port = process.env.PORT || 3000;



app.get("/",(req,res)=>{
  res.send("connected to server")
})

app.use("/admin",adminroute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
