import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getUsersForSidebar,
  updateProfile,
} from "../controllers/user.controller.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.put("/update", protectRoute, upload.single("profilePic"), updateProfile);

export default router;
