import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import taskAPI from "../Services/Api";
import type { Task } from "../types/Task";

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");

  const fetchTask = async () => {
    try {
      const res = await taskAPI.get(`/${id}`);
      setTask(res.data);
      setNewTitle(res.data.title);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async () => {
    if (!newTitle.trim() || !task) return;
    await taskAPI.patch(`/${id}`, { title: newTitle });
    fetchTask();
  };

  const toggleCompletion = async () => {
    if (!task) return;
    await taskAPI.patch(`/${id}`, { completed: !task.completed });
    fetchTask();
  };

  const deleteTask = async () => {
    await taskAPI.delete(`/${id}`);
    navigate("/");
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  if (loading) return <p className="p-6 text-gray-500">Loading task...</p>;
  if (!task) return <p className="p-6 text-red-500">Task not found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">Task Details</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div>
          <label className="text-gray-700 font-semibold">Title</label>
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-3 mt-1 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-gray-700 font-semibold">Description</label>
          <p className="p-3 bg-gray-100 rounded-xl">{task.description || "No description"}</p>
        </div>

        <div>
          <label className="text-gray-700 font-semibold">Priority</label>
          <p
            className={`p-2 mt-1 rounded-xl text-white font-semibold w-max ${
              task.priority === "high"
                ? "bg-red-500"
                : task.priority === "normal"
                ? "bg-blue-500"
                : "bg-green-500"
            }`}
          >
            {task.priority
  ? task.priority.charAt(0).toUpperCase() + task.priority.slice(1)
  : "Normal"}
          </p>
        </div>

        <div>
          <label className="text-gray-700 font-semibold">Due Date</label>
          <p className="p-2 mt-1 bg-gray-100 rounded-xl">{task.dueDate || "Not set"}</p>
        </div>

        <div>
          <label className="text-gray-700 font-semibold">Status</label>
          <p
            className={`p-2 mt-1 w-max rounded-xl font-semibold text-white ${
              task.completed ? "bg-green-600" : "bg-yellow-600"
            }`}
          >
            {task.completed ? "Completed" : "Pending"}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">
          <button
            onClick={updateTask}
            className="px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Save
          </button>
          <button
            onClick={toggleCompletion}
            className={`px-5 py-3 rounded-xl text-white transition ${
              task.completed ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {task.completed ? "Mark Incomplete" : "Mark Complete"}
          </button>
          <button
            onClick={deleteTask}
            className="px-5 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-500 underline"
        >
          Back to Tasks
        </button>
      </div>
    </div>
  );
}
