"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance"; // Assuming you have axiosInstance
import { useRouter } from "next/navigation";

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const response = await axiosInstance.post("/posts", { ...newPost, author: "author"});
      return response.data;
    },
    onSuccess: () => {
      // Invalidate cache to refetch the posts list if needed
      queryClient.invalidateQueries(["posts"]);
      // Redirect to the post management page after successful creation
      router.push("/post-management ");
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { title, content };
    mutation.mutate(newPost);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <header className="bg-blue-600 text-white py-4">
        <h1 className="text-center text-3xl font-bold">Create New Post</h1>
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
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Creating..." : "Create Post"}
          </button>
        </form>
      </main>
      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; {new Date().getFullYear()} Blog Platform
      </footer>
    </div>
  );
};

export default PostCreate;
