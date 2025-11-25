import React, { useState } from "react";
import { signUp } from "../Services/Api";
import { useNavigate } from "react-router";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp({ name, email, password });
      navigate("/signin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-900 rounded text-white">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-700"
          required
        />
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
        <button className="bg-green-600 py-2 rounded mt-2">Sign Up</button>
      </form>
    </div>
  );
}
