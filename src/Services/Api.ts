// import axios from "axios";

// const taskAPI = axios.create({
//   baseURL: "https://taskmanagerserver-zw50.onrender.com/api/tasks",
// });

// export default taskAPI;

// const API = axios.create({
//   baseURL: "https://taskmanagerserver-zw50.onrender.com/api/users",
// });

// export const signUp = (data: { name: string; email: string; password: string }) =>
//   API.post("/signup", data);

// export const signIn = (data: { email: string; password: string }) =>
//   API.post("/signin", data);

// export const getProfile = (token: string) =>
//   API.get("/profile", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
import axios from "axios";

const taskAPI = axios.create({
  baseURL: "https://taskmanagerserver-zw50.onrender.com/api/tasks",
});

taskAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (!config.headers) config.headers = {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default taskAPI;

const API = axios.create({
  baseURL: "https://taskmanagerserver-zw50.onrender.com/api/users",
});

export const signUp = (data: { name: string; email: string; password: string }) =>
  API.post("/signup", data);

export const signIn = (data: { email: string; password: string }) =>
  API.post("/signin", data);

export const getProfile = (token: string) =>
  API.get("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
