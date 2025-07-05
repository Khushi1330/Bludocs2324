import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  getSignedUrl,
  saveFileMetadata,
  listDocuments,
} from "../controllers/document.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/presign", getSignedUrl);
router.post("/metadata", saveFileMetadata);
router.get("/", listDocuments);

export default router;
