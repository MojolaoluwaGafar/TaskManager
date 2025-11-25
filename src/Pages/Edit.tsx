import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../Services/Api";



export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const getTask = async () => {
    const res = await api.get(`/${id}`);
    setTitle(res.data.title);
  };

  useEffect(() => {
    getTask();
  }, []);

  const updateTask = async () => {
    await api.patch(`/${id}`, { title });;
    navigate("/");
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Edit Task</h2>

      <input
        className="px-3 py-2 w-full rounded bg-gray-900 border border-gray-700 mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={updateTask}
        className="px-4 py-2 bg-blue-600 rounded hover:opacity-80"
      >
        Update
      </button>
    </div>
  );
}