# Image Upload API

This is a backend project built using Node.js and Express that allows users to upload and manage multiple images. The images are stored securely on Cloudinary, while metadata such as titles and URLs are stored in MongoDB.

## Features
- Upload single and multiple images
- Store images in Cloudinary
- Save image URLs and titles in MongoDB
- Fetch images sorted by latest
- Handles multiple titles for multiple images

## Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer
- Cloudinary

## API Endpoints
- POST /upload → Upload images
- GET /images → Fetch all images