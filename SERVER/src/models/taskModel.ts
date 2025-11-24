import { pool } from "../db";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export const getAllTasks = async () => {
  const res = await pool.query("SELECT * FROM tasks ORDER BY created_at DESC");
  return res.rows;
};

export const createTask = async (title: string) => {
  const res = await pool.query(
    "INSERT INTO tasks (title, completed) VALUES ($1, false) RETURNING *",
    [title]
  );
  return res.rows[0];
};

export const updateTask = async (id: string, completed?: boolean, title?: string) => {
  const task = await pool.query("SELECT * FROM tasks WHERE id=$1", [id]);
  if (task.rows.length === 0) return null;

  const updated = await pool.query(
    "UPDATE tasks SET title=$1, completed=$2 WHERE id=$3 RETURNING *",
    [title ?? task.rows[0].title, completed ?? task.rows[0].completed, id]
  );
  return updated.rows[0];
};

export const deleteTask = async (id: string) => {
  const res = await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
  return res.rowCount > 0;
};
