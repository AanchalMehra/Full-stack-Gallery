import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true

    },
    password:{
        type:String,
        required:true
    }
    ,
    role:{
        type: String,
        enum:["ADMIN","USER"],
        default: "USER"
    }
})


const User=mongoose.model("User",userSchema);

export default User;