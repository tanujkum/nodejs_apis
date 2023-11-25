const mongoose = require("mongoose");

const userModel =  mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    confirmPassword:{
        type:String
    },
    token:{
        type:String 
    }
})

const user = new mongoose.model("user",userModel)

module.exports = {user}