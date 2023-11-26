const mongoose=require("mongoose");

const DB = process.env.DB;

mongoose.connect(DB,{
    
}).then(()=>{
    console.log("Connected Successfully")
}).catch((err)=>{
    console.log(`Problem Occurs ${err.message}`)
})