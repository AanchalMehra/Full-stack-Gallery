import express from "express";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/test", upload.single("image"), (req, res) => {
  try {
    res.json({
      message: "File received!",
      file: req.file
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
