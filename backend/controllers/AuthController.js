import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleSignUp= async(req,res)=>{

try{
     const {firstName,lastName,email,password}=req.body;
     //if any field not filled
     if(!firstName||  !lastName ||!email||!password){
         return res.status(400).json({err:"Please fill all the required fields"});
     }
      const user= await User.findOne({email:email});
      if(user){
        return res.status(400).json({err:"User already exists"});
      }
      const hashedPassword= await bcrypt.hash(password,10);
      await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword
      })
      return res.status(201).json({msg:"User created successfully"});
}
catch(err){
    return res.status(500).json({err:err.message});
}
}

export const handleLogin=async(req,res)=>{
    try{
       const {email,password}=req.body;
     //if any field not filled
     if(!email||!password){
         return res.status(400).json({err:"Please fill all the required fields"});
     }
      const user= await User.findOne({email:email});
      if(!user){
        return res.status(400).json({err:"User does not exists"});
      }
      //check if password matches

      const match= await bcrypt.compare(password,user.password);
      if(!match){
        return res.status(400).json({err:"Invalid credentials"});
      }

      const payload={
        id:user._id,
        role:user.role
      }
      //create jwt token

      const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"7d"})

      return res.status(200).json({
          msg: "Login successful",
          token,
          role:user.role,
          firstName: user.firstName
        })

}
catch(err){
    return res.status(500).json({err:err.message});
}

}