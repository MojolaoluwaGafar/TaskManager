import { Request, Response } from "express";
import * as TaskModel from "../models/taskModel";

export const getTasks = async (req: Request, res: Response) => {
  const tasks = await TaskModel.getAllTasks();
  res.json(tasks);
};

export const addTask = async (req: Request, res: Response) => {
  const { title } = req.body;
  const task = await TaskModel.createTask(title);
  res.json(task);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed, title } = req.body;
  const task = await TaskModel.updateTask(id, completed, title);
  res.json(task);
};

export const removeTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const success = await TaskModel.deleteTask(id);
  res.json({ success });
};
