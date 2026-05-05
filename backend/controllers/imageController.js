import Image from "../models/imageModel.js"
import uploadFromBuffer from "../utils/CloudinaryHelper.js"
import cloudinary from "../configuration/cloudinary.js";


export const handleUpload=async(req,res)=>{

      try{

        console.log("FILES:", req.files);
         console.log("BODY:", req.body);
        if (!req.files || req.files.length === 0) 
        {
           return res.status(400).json({ msg: "No files uploaded" });
        }
        
        if (req.files.length > 3) {
      return res.status(400).json({
        msg: "You can upload maximum 3 images only"
      });
       }
        const uploadedImages=[]

        for (let i = 0; i < req.files.length; i++){
        const file = req.files[i];
        const result = await uploadFromBuffer(file.buffer);

    
        const newImage = await Image.create({        
            imageURL: result.secure_url,
            publicId: result.public_id
        });
        uploadedImages.push(newImage)}

          res.json({
            msg: "Image uploaded successfully!",
            image: uploadedImages
        });
      }
      catch(err){
          console.error(err);
        res.status(500).json({ err: err.message });
      }
}

export const displayImages= async (req,res)=>{
    try{
        const images = await Image.find().sort({ createdAt: -1 });
        res.json(images)
            

    }
    catch(err){
         console.error(err);
        res.status(500).json({ err: err.message });
    }

}

export const deleteImage= async (req,res)=>{
    try{
        const { id } = req.params;
        const image = await Image.findById(id);
        if (!image) {
           return res.status(404).json({ msg: "Image not found" });
        }
         //delete from cloudinary
        await cloudinary.uploader.destroy(image.publicId);

        //delete from database
        await Image.findByIdAndDelete(id);

        res.status(200).json({ msg: "Image deleted successfully" });
        

    }
    catch(err){
         console.error(err);
        res.status(500).json({ err: err.message });
    }
}