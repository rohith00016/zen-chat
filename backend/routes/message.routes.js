import express from "express";
import {
  getMessages,
  sendMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, upload.single("file"), sendMessage);
router.put("/update/:messageId", protectRoute, updateMessage);
router.delete("/delete/:messageId", protectRoute, deleteMessage);

export default router;
