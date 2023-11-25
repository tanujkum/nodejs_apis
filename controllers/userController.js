const { user } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup=async(req,res)=>{
    try {
        const {name,email,password,confirmPassword} = req.body;
       
        if(!name || !email || !password || !confirmPassword){
            return res.status(200).json({status:true,message:"Please fill all fields"})
        }
        const dataExist = await user.findOne({email})
        if(!dataExist){
           if(password!==confirmPassword){
            return res.status(200).json({status:true,message:"Password and Confirm Password not match"})
           }else{
            const hashPassword = await bcrypt.hash(password,12);
            const hashConfirmPassword = await bcrypt.hash(confirmPassword,12);
            const newUser = new user({name,email,password:hashPassword,confirmPassword:hashConfirmPassword})

            newUser.save();

            return res.status(200).json({status:true,message:"New User Registered Successfully"})
           }
        }else{
            return res.status(200).json({status:true,message:"Email already Exist"})
        }
    } catch (error) {
        return res.status(500).json({status:false,message:error})
    }
}
const userLogin=async(req,res)=>{
    try {
        const {email,password} =  req.body;
        if(!email || !password){
            return res.status(200).json({status:true,message:"Please fill all fields"})
        }

        const userExist = await user.findOne({email});
        if(userExist){
            const passMatch = await bcrypt.compare(password,userExist.password);
            if(passMatch){
                const payload = {
                    _id:userExist._id,
                    email:userExist.email
                };
                const JWT_SECRET_KEY = process.env.SECRET;
                jwt.sign(payload,JWT_SECRET_KEY,{expiresIn:84600},async(err,token)=>{
                    await user.updateOne({_id:userExist._id}  ,{
                        $set:{token}
                    })  
                    await userExist.save();    
                    return res.status(200).json({status:true,message:"Signed In Successfully",data:{name:userExist.name,email:userExist.email,token:userExist.token,id:userExist._id}})                    
                })

            }else{
                return res.status(200).json({status:true,message:"Email or password is incorrect"})  
            }
        }else{
            return res.status(200).json({status:true,message:"Please create account then login,,,"}) 
        }
    } catch (error) {
        return res.status(500).json({status:false,message:error}) 
    }
}


module.exports= {userSignup,userLogin}