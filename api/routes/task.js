import express from "express";
import {
  CreateTask,
  DisplayTask,
  DeleteTask,
  UpdateTask,
} from "../controllers/task.js";
import { authentication } from "../middleware/authentication.js";
const router = express.Router();

//Create Task
router.post("/create", authentication, CreateTask);

//Display Tasks
router.get("/display", authentication, DisplayTask);

//Delete Task
router.delete("/delete/:id", authentication, DeleteTask);

//Update Task
router.put("/update/:id", authentication, UpdateTask);

export default router;
