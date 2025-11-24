import React, { useState } from "react";
import TaskItem from "../components/TaskItem";
import type { Task } from "../types/Task"

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [value, setValue] = useState("");

  const addTask = () => {
    if (value.trim() === "") return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: value,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setValue("");
  };

  const deleteTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));

  const toggleTask = (id: string) =>
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

  const editTask = (id: string, newTitle: string) =>
    setTasks(tasks.map(t => t.id === id ? { ...t, title: newTitle } : t));

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
