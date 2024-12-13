"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance"; // Assuming you have axiosInstance
import { useParams, useRouter } from "next/navigation";

const UserProfile = () => {
  const router = useRouter();
  const { slug } = useParams()
  

  // Define the queryKey and queryFn for fetching user data
  const queryKey = ["user", slug];
  const queryFn = async () => {
    const response = await axiosInstance.get(`proxy/users/${slug}`);
    return response.data;
  };

  // Fetch the user data using useQuery
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey,
    queryFn,
    enabled: !!slug, // Only run the query when `id` is available
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <header className="bg-green-600 text-white py-4">
        <h1 className="text-center text-3xl font-bold">{user?.name}'s Profile</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold">Details</h2>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Joined:</strong> {new Date(user?.created_at).toLocaleDateString()}
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
