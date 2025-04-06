import express from "express";
import {
  getWorkouts,
  addWorkout,
  updateWorkout,
  deleteWorkout
} from "../controllers/workoutController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.use(verifyToken);
router.get("/", getWorkouts);
router.post("/", addWorkout);
router.put("/:id", updateWorkout);
router.delete("/:id", deleteWorkout);

export default router;