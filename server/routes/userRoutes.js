import express from "express";
import { signup, login, getUserCreations, getPublishedCreations, toggleLikeCreation } from "../controllers/userController.js";
const router = express.Router();

router.get('/get-user-creations',getUserCreations)
router.get('/get-published-creations',getPublishedCreations)
router.post('/toggle-like-creation',toggleLikeCreation)
router.post("/signup", signup);
router.post("/login", login);

export default router;
