"use client";
import axiosInstance from "@/api/axiosInstance";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const PostManagement = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const isAuthenticated = useAuth(); // Get the authentication status from the hook
  
    if (!isAuthenticated) {
        return router.push("/login");
    }

    const {
        data: posts,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["posts"], // Query key for posts
        queryFn: async () => {
            const response = await axiosInstance.get("/posts");
            return response.data;
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axiosInstance.delete(`/posts/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (err) => {
            console.error("Failed to delete post:", err);
        },
    });

    // Handle delete button click
    const handleDelete = (id) => {
        deleteMutation.mutate(id);
    };

    if (isLoading) {
        return <p>Loading posts...</p>;
    }

    if (isError) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100  flex flex-col justify-between">
            <header className="bg-blue-600 text-white py-4">
                <h1 className="text-center text-3xl font-bold">
                    Post Management
                </h1>
            </header>
            <main className="container mx-auto p-4">
                <div className="text-right mb-4">
                    <Link
                        href="/posts/create"
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
                                <tr key={post._id}>
                                    <td className="border px-4 py-2">
                                        {post.title}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <Link
                                            href={`/posts/update/${post._id}`}
                                            className="text-blue-500 hover:underline mr-2"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(post._id)
                                            }
                                            className="text-red-500 hover:underline"
                                            disabled={deleteMutation.isPending} // Disable while deleting
                                        >
                                            {deleteMutation.isPending
                                                ? "Deleting..."
                                                : "Delete"}
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
