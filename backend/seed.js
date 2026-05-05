import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import User from "./models/UserModel.js"

dotenv.config();

const seedAdmin = async () => {
  try {
    // connect DB
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    

    // hash password from env
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    // create admin
    const admin = new User({
  firstName: "Admin",
  lastName: "User",
  email: process.env.ADMIN_EMAIL,
  password: hashedPassword,
  role: "ADMIN",
});

    await admin.save();

    console.log("🚀 Admin created successfully");
    console.log("Email:", process.env.ADMIN_EMAIL);
    console.log("Password:", process.env.ADMIN_PASSWORD);

    process.exit();
  } catch (err) {
    console.log("Seed error:", err);
    process.exit(1);
  }
};

seedAdmin();