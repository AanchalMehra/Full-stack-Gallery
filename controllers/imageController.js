const fs = require("fs");
const Image=require("../models/imageModel");
const cloudinary=require("../configuration/cloudinary")


exports.handleUpload=async(req,res)=>{
      try{
        if (!req.files || req.files.length === 0) {
     return res.status(400).json({ message: "No files uploaded" });
}
         let uploadedImages=[]
         let titles = req.body.titles;

        if (!Array.isArray(titles)) {
            titles = [titles];
            }

        for (let i = 0; i < req.files.length; i++){
        const file = req.files[i];
        const result= await cloudinary.uploader.upload(file.path);

        fs.unlink(file.path, (err) => {
  if (err) console.error("Delete failed:", err);
});
    
        const newImage = await Image.create({
            title: titles[i],
            imageURL: result.secure_url
        });
        uploadedImages.push(newImage)}

          res.json({
            message: "Image uploaded successfully!",
            image: uploadedImages
        });
      }
      catch(err){
          console.error(err);
        res.status(500).json({ error: err.message });
      }
}

exports.displayImages= async (req,res)=>{
    try{
        const images = await Image.find().sort({ createdAt: -1 });
        res.json(images);

    }
    catch(err){
         console.error(err);
        res.status(500).json({ error: err.message });
    }

}