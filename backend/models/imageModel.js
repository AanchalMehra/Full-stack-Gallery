import mongoose from "mongoose";

const imageSchema= new mongoose.Schema({
    imageURL:{
        type:String,
        required: true
    },
    publicId:{
        type:String,
        required:true
    }
},
    { timestamps: true }
)

const Image=mongoose.model("Image",imageSchema);
export default Image;
