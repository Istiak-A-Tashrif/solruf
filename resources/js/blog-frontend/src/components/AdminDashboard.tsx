"use client";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100  flex flex-col justify-between">
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-center text-3xl font-bold">Admin Dashboard</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Post Management</h2>
            <p className="text-gray-600 mb-4">
              Create, edit, and delete blog posts.
            </p>
            <Link
              href="/post-management"
              className="text-blue-500 hover:underline font-semibold"
            >
              Manage Posts
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg">
            <h2 className="text-xl font-semibold mb-2">User Management</h2>
            <p className="text-gray-600 mb-4">
              Manage user profiles (create, update, delete).
            </p>
            <Link
              href="/user-management"
              className="text-blue-500 hover:underline font-semibold"
            >
              Manage Users
            </Link>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} Blog Platform
      </footer>
    </div>
  );
};

export default AdminDashboard;
