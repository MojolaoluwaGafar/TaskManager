import express from "express";
import { getTasks, addTask, updateTask, removeTask } from "../controllers/tasksController";

const router = express.Router();

router.get("/", getTasks);
router.post("/", addTask);
router.patch("/:id", updateTask);
router.delete("/:id", removeTask);

export default router;
