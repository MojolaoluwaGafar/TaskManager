import React, { useState } from "react";
import { signIn } from "../Services/Api";
import { useNavigate } from "react-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await signIn({ email, password });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/");
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-900 rounded text-white">
      <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
          required
        />
        <button className="bg-blue-600 py-2 rounded mt-2">Sign In</button>
      </form>
    </div>
  );
}
