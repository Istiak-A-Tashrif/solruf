"use client";
import axiosInstance from "@/api/axiosInstance";
import { useQuery } from '@tanstack/react-query';
import { useParams } from "next/navigation";

const SingleBlog = () => {
  const { slug } = useParams();

  // Define the queryKey and queryFn for React Query
  const queryKey = ['singleBlog', slug];
  const queryFn = async () => {
    const response = await axiosInstance.get(`/posts/${slug}`);
    return response.data;
  };

  // Use the useQuery hook with explicit queryKey and queryFn
  const { data: blog, isLoading, isError, error } = useQuery({
    queryKey,   // The unique query key for the data
    queryFn,    // The function to fetch the data
    enabled: !!slug, // Ensure the query is not fired until the slug is available
  });

  // Handle loading, error, and success states
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100  flex flex-col justify-between">
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
