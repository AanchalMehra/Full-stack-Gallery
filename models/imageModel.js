const mongoose=require("mongoose");

const imageSchema= new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    imageURL:{
        type:String,
        required: true
    }
},
    { timestamps: true }
)

const Image=mongoose.model("Image",imageSchema);
module.exports=Image;
