import React, { useState, useEffect } from "react";
import api from "../Services/Api";
import {Task} from "../Types/task"
import { Link } from "react-router";


export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  // GET ALL TASKS
  const fetchTasks = async () => {
    const res = await api.get("/");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // CREATE TASK
  const addTask = async () => {
    if (!newTask.trim()) return;

    await api.post("/", { title: newTask });
    setNewTask("");
    fetchTasks();
  };

  // DELETE TASK
  const deleteTask = async (id: number) => {
    await api.delete(`/${id}`);
    fetchTasks();
  };

  // TOGGLE TASK COMPLETE
  const toggleTask = async (id: number, completed: boolean) => {
    await api.patch(`/${id}`, { completed: !completed });
    fetchTasks();
  };
  return (
     <div className="px-6 py-6 text-white">

      {/* Add Task */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter task..."
          className="px-3 py-2 w-full rounded bg-gray-900 border border-gray-700"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />

        <button
          onClick={addTask}
          className="px-4 py-2 bg-blue-600 rounded hover:opacity-80"
        >
          Add
        </button>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between px-4 py-3 bg-gray-800 rounded"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id, task.completed)}
              />

              <span
                className={`${
                  task.completed ? "line-through text-gray-500" : ""
                } text-lg`}
              >
                {task.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={`/edit/${task.id}`}
                className="text-yellow-400 hover:opacity-80"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:opacity-80"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}