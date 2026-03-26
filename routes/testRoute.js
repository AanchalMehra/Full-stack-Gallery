const express=require("express");
const router=express.Router();
const upload = require("../middleware/multerMiddleware");

router.post("/test",upload.single("image"),(req,res)=>{
    try {
        res.json({
            message: "File received!",
            file: req.file
        });
    } catch (err) {
      
        res.status(500).json({ error: err.message });
    }
});

module.exports=router;