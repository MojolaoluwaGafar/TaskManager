import React, { useState } from "react";
import type {Task } from "../types/Task";

type Props = {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
}

export default function TaskItem({ task, onDelete, onToggle, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  const handleEdit = () => {
    if (isEditing && value.trim() !== "") {
      onEdit(task.id, value);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 p-3 rounded mb-2">
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="p-2 border rounded"
        />
      ) : (
        <p
          className={`cursor-pointer ${task.completed ? "line-through text-gray-400" : ""}`}
          onClick={() => onToggle(task.id)}
        >
          {task.title}
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleEdit}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
