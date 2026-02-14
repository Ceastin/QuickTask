const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const jwtSecretKey=process.env.JWT_SECRET;
const jwtExpiry=process.env.JWT_EXPIRES_IN;
const signUp=async(req,res)=>{
    console.log("hit");
    try{
        const {name,email,password}=req.body;
        const hashPassword=await bcrypt.hash(password,10);
        const user=new User({
            fullname:name,
            email:email,
            password:hashPassword
        });
        await user.save();
        return res.status(201).json({message:"User registered Successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message:"User Doesn't exist"});
    }
};
const login=async(req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email:email});
    
    if(!user){
        return res.status(400).json({message:"Invalid Credential"});
    }
    console.log("till here")
    const isMatch=await bcrypt.compare(password,user.password);
    console.log("till here")
    if(!isMatch){
        return res.status(400).json({message:"Invalid Credential"});
    }
    console.log("till here")
    const payload={
        userId:user._id,
        username:user.username,
        role:user.role
    };
    const token=jwt.sign(payload,jwtSecretKey,{
        expiresIn:jwtExpiry
    });
    res.json({message:"Login Successful",token:token});
};
const allUser=async(req,res)=>{
    const data=await User.find();
    return res.status(200).json(data);
}
module.exports={signUp,login,allUser};