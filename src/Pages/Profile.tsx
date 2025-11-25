import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getProfile } from "../Services/Api";

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in.");
        return;
      }

      try {
        const res = await getProfile(token);
        setUser(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch profile.");
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  if (error) {
    return (
      <div className="p-6 text-white">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-gray-900 rounded text-white">
      <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
      <div className="flex flex-col gap-2 mb-6">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Joined:</span>{" "}
          {new Date(user.created_at).toLocaleDateString()}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 rounded hover:opacity-80"
      >
        Logout
      </button>
    </div>
  );
}
