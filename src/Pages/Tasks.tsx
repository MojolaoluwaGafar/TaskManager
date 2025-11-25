import React, { useState, useEffect, useCallback } from "react";
import TaskItem from "../components/TaskItem";
import type { Task } from "../types";
import taskAPI from "../Services/Api";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("normal");
  const [dueDate, setDueDate] = useState("");

  const [search, setSearch] = useState("");

  const fetchTasks = async (query: string = "") => {
    try {
      const res = query
        ? await taskAPI.get(`/search?q=${query}`)
        : await taskAPI.get("/");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    await taskAPI.post("/", {
      title,
      description,
      priority,
      dueDate,
    });

    setTitle("");
    setDescription("");
    setPriority("normal");
    setDueDate("");
    setShowForm(false);

    fetchTasks(search);
  };

  const toggleTask = async (id: string, completed: boolean) => {
    await taskAPI.patch(`/${id}`, { completed: !completed });
    fetchTasks(search);
  };

  const editTask = async (id: string, newTitle: string) => {
    await taskAPI.patch(`/${id}`, { title: newTitle });
    fetchTasks(search);
  };

  const deleteTask = async (id: string) => {
    await taskAPI.delete(`/${id}`);
    fetchTasks(search);
  };

  // debounce search
  const debounce = (func: Function, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedFetch = useCallback(
    debounce((query: string) => fetchTasks(query), 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    debouncedFetch(query);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 tracking-tight">
        Organize Your Tasks
      </h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        {showForm ? "Close Form" : "Create New Task"}
      </button>

      {showForm && (
        <div className="mb-6 bg-white border rounded-xl p-5 shadow-sm space-y-4 animate-fadeIn">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
            placeholder="Task title"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 h-24"
            placeholder="Task description..."
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 border rounded-xl"
          >
            <option value="low">Low priority</option>
            <option value="normal">Normal priority</option>
            <option value="high">High priority</option>
          </select>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-3 border rounded-xl text-gray-700"
          />

          <button
            onClick={addTask}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Add Task
          </button>
        </div>
      )}

      <div className="mb-6">
        <input
          value={search}
          onChange={handleSearch}
          className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="Search tasks..."
        />
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-xl border">
            No tasks found.
          </div>
        ) : (
          tasks.map((task) => (
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
