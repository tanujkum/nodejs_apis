const jwt=require('jsonwebtoken');
const { user} = require('../models/userModel')

const auth=async(req,res,next)=>{
    let _secrate = req.headers["_token"];
    try{
        const proof=jwt.verify(_secrate,process.env.SECRET, { algorithm: 'HS512' });
        const userData=await user.findOne({_id:proof._id});
        if(!userData){
            throw new Error("User not found")
        }
        req.userData=userData;
        req.id=userData._id;
        next();
       }catch(err){
           return res.status(201).json({success:false,message:"Unauthorised user"});
              
       }
}

module.exports=auth;