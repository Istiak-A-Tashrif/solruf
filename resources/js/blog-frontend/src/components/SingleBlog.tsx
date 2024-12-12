"use client";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";

const SingleBlog = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/api/blogs/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.error("Failed to fetch blog post:", err);
      }
    };
    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-center text-3xl font-bold">{blog.title}</h1>
      </header>
      <main className="container mx-auto p-4">
        <p className="text-gray-600">{blog.publishedAt}</p>
        <article className="prose lg:prose-xl mx-auto">
          {blog.content}
        </article>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} Blog Platform
      </footer>
    </div>
  );
};

export default SingleBlog;
