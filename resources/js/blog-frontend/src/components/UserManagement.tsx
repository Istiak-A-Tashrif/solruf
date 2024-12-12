"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id)); // Update the state
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white py-4">
        <h1 className="text-center text-3xl font-bold">User Management</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="text-right mb-4">
          <Link
            href="/admin/users/create"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Create New User
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <Link
                      href={`/admin/users/edit/${user.id}`}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} Blog Platform
      </footer>
    </div>
  );
};

export default UserManagement;
