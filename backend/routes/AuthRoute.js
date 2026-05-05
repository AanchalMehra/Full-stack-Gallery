
import express from "express";

import {
  handleLogin,
  handleSignUp} from "../controllers/AuthController.js"

const authrouter = express.Router();

authrouter.post("/signup", handleSignUp);

authrouter.post("/login", handleLogin);

export default authrouter;