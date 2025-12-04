import express from "express";
import auth from "../middleware/auth.js";
import {
  createCreation,
  getCreations,
  updateCreation,
  deleteCreation,
} from "../controllers/creationsController.js";

const router = express.Router();

router.post("/", auth, createCreation);
router.get("/", auth, getCreations);
router.put("/:id", auth, updateCreation);
router.delete("/:id", auth, deleteCreation);

export default router;
