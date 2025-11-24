import React, { useState } from "react";
import TaskItem from "../components/TaskItem";
import type { Task } from "../types/Task"
import api from "../Services/Api"

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [value, setValue] = useState("");

  const fetchTasks = async () => {
  const res = await api.get("/");
  setTasks(res.data);
};

const addTask = async () => {
  if (!value.trim()) return;
  await api.post("/", { title: value });
  setValue("");
  fetchTasks();
};

const toggleTask = async (id: string, completed: boolean) => {
  await api.patch(`/${id}`, { completed: !completed });
  fetchTasks();
};

const editTask = async (id: string, newTitle: string) => {
  await api.patch(`/${id}`, { title: newTitle });
  fetchTasks();
};

const deleteTask = async (id: string) => {
  await api.delete(`/${id}`);
  fetchTasks();
};

  return (
    <div className="p-6">
      <div className="flex gap-2 mb-4">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Add a new task..."
        />
        <button onClick={addTask} className="bg-green-600 text-white px-4 rounded">
          Add
        </button>
      </div>

      <div>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet.</p>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onToggle={toggleTask}
              onEdit={editTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
