import express from "express";
const router = express.Router();

import upload from "../middleware/multerMiddleware.js";
import {
  handleUpload,
  displayImages,
  deleteImage
} from "../controllers/imageController.js";
import { auth } from "../middleware/AuthMiddleware.js";
import { isAdmin } from "../middleware/AdminMiddleware.js";


router.post("/upload",auth,upload.array("image",3),handleUpload );
router.get("/display",auth,displayImages);
router.delete("/delete/:id",auth,isAdmin,deleteImage);

export default router;
