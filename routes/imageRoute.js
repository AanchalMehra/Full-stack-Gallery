const express=require("express");
const router=express.Router();
const upload = require("../middleware/multerMiddleware");
const {handleUpload,displayImages}=require("../controllers/imageController")


router.post("/upload",upload.array("image",3),handleUpload );
router.get("/images",displayImages);

module.exports = router;