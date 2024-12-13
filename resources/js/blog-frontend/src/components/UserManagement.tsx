"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance"; // Assuming you have axiosInstance
import Link from "next/link";

const UserManagement = () => {
  const queryClient = useQueryClient();

  // Define the queryKey and queryFn for fetching users
  const queryKey = ["users"];
  const queryFn = async () => {
    const response = await axiosInstance.get("/proxy/users");
    return response.data;
  };

  // Fetch users using useQuery
  const { data: users, isLoading, isError, error } = useQuery({
    queryKey,    // Query key for users
    queryFn,     // Fetch function for users
  });

  // Define the mutation for deleting a user
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosInstance.delete(`/proxy/users/${id}`);
    },
    onSuccess: () => {
      // Invalidate the cache and refetch the users
      queryClient.invalidateQueries(queryKey);
    },
    onError: (err) => {
      console.error("Failed to delete user:", err);
    },
  });

  // Handle delete button click
  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <header className="bg-green-600 text-white py-4">
        <h1 className="text-center text-3xl font-bold">User Management</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="text-right mb-4">
          <Link
            href="/users/create"
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
              {users?.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2"> <Link
                                            href={`/user-profile/${user.id}`}
                                            className="text-blue-500 hover:underline mr-2"
                                        >
                                        {user.name}
                                        </Link></td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">
                    <Link
                      href={`/users/update/${user.id}`}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:underline"
                      disabled={deleteMutation.isPending} // Disable while deleting
                    >
                      {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
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
