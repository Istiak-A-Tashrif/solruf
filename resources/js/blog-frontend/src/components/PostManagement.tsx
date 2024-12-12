"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const PostManagement = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/blogs");
        setPosts(response.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/blogs/${id}`);
      setPosts(posts.filter((post) => post.id !== id)); // Update the state
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-center text-3xl font-bold">Post Management</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="text-right mb-4">
          <Link
            href="/admin/posts/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Create New Post
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="border px-4 py-2">{post.title}</td>
                  <td className="border px-4 py-2">
                    <Link
                      href={`/admin/posts/edit/${post.id}`}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
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

export default PostManagement;
