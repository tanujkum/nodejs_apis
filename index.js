const express = require('express');
const app=express();
const dotenv = require('dotenv');
const { router } = require('./routers/router');
dotenv.config({});
require("./db/connection")
app.use(express.json());

const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, 
  });



app.get('/',apiLimiter,async(req,res)=>{
    return res.json({status:true,message:"Hello from Backend"})
})


app.use('/user',router)



const PORT = 2000;
app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})