import React from "react";
import type { Task } from "../types/Task";
import { useNavigate } from "react-router";

type Props = {
  task: Task;
  onDelete: (id: string) => void;
  onToggle: (id: string, completed: boolean) => void;
};

export default function TaskItem({ task, onDelete, onToggle }: Props) {
  const navigate = useNavigate();

  const openDetails = () => {
    navigate(`/task/${task.id}`);
  };

  const goToEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/task/${task.id}/edit`);
  };

  const toggleCompletion = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(task.id, task.completed);
  };

  return (
    <div
      className="flex items-center justify-between bg-white shadow-sm border rounded-xl p-4 mb-3 hover:shadow-md transition cursor-pointer"
      onClick={openDetails}
    >
      <div className="flex-1 flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onClick={toggleCompletion}
          className="w-5 h-5 cursor-pointer"
        />
        <p className={`text-lg ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
          {task.title}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={goToEdit}
          className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          Edit
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          className="px-3 py-1 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
