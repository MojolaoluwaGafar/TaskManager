import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
});

export default api;
