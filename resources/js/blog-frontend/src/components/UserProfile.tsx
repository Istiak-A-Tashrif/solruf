"use client";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";

const UserProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}`);
        setUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white py-4">
        <h1 className="text-center text-3xl font-bold">{user.name}'s Profile</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold">Details</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} Blog Platform
      </footer>
    </div>
  );
};

export default UserProfile;
