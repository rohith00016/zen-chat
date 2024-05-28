import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/signup", upload.single("profilePic"), signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;
