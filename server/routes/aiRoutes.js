
import express from "express";
import { generateArticle, generateBlogTitle, generateImage, removeImageBackground, resumereview } from '../controllers/aiController.js';
import auth from "../middleware/auth.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/generate-article", auth, generateArticle);
router.post("/generate-blog-title", auth, generateBlogTitle);
router.post("/generate-image", auth, generateImage);
router.post("/remove-image-background", upload.single('image'), auth, removeImageBackground);


router.post("/resume-review", upload.single('resume'), auth, resumereview);

export default router;
