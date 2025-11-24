const express =require("express");
const { getTasks, addTask, updateTask, removeTask } = require("../controllers/tasksController.ts");

const router = express.Router();

router.get("/", getTasks);
router.post("/", addTask);
router.patch("/:id", updateTask);
router.delete("/:id", removeTask);

module.exports= router;
