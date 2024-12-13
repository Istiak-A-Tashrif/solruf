"use client";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance"; // Assuming you have axiosInstance
import { useParams, useRouter } from "next/navigation";

const PostUpdate = () => {
  const router = useRouter();
  const { slug } = useParams()

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data: post, isLoading, isError, error } = useQuery({
    queryKey: ["post", slug],
    queryFn: async () => {
      const response = await axiosInstance.get(`/posts/${slug}`);
      return response.data;
    },
    enabled: !!slug, // Only fetch when `id` is available
  });

  const mutation = useMutation({
    mutationFn: async (updatedPost) => {
      const response = await axiosInstance.put(`/posts/${slug}`, updatedPost);
      return response.data;
    },
    onSuccess: () => {
      // Redirect after successful update
      router.push("/post-management");
    },
    onError: (error) => {
      console.error("Error updating post:", error);
    },
  });

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = { title, content };
    mutation.mutate(updatedPost);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-100  flex flex-col justify-between">
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-center text-3xl font-bold">Update Post</h1>
      </header>
      <main className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Updating..." : "Update Post"}
          </button>
        </form>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} Blog Platform
      </footer>
    </div>
  );
};

export default PostUpdate;
