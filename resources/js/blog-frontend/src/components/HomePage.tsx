"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/blogs");
        setBlogs(response.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-center text-3xl font-bold">Blog Home</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg"
            >
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600 line-clamp-3">{blog.content}</p>
              <a
                href={`/blog/${blog.id}`}
                className="text-blue-500 hover:underline mt-2 block"
              >
                Read More →
              </a>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} Blog Platform
      </footer>
    </div>
  );
};

export default HomePage;
