import streamifier from "streamifier";
import cloudinary from "../configuration/cloudinary.js";

const uploadFromBuffer = (buffer) => {
  console.log("UPLOAD START");
  return new Promise((resolve, reject) => {

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export default uploadFromBuffer;