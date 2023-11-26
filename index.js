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
    return res.json({success:true,message:"Hello, after CI/CD workflow..."})
})


app.use('/user',router)



const PORT = process.env.PORT;;
app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`)
})