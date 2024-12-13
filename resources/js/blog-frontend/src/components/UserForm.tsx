"use client";

import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { useParams, useRouter } from "next/navigation";

const UserForm = () => {
    const { slug } = useParams(); // Fetch userId from the URL slug
    const userId = slug
    const router = useRouter();  // For redirecting after successful submission
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: "",
    });

    const queryClient = useQueryClient();

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Fetch user data if userId is provided (for editing)
    useEffect(() => {
        if (userId) {
            axiosInstance
                .get(`/proxy/users/${userId}`)
                .then((response) => {
                    setFormData({
                        name: response.data.name,
                        email: response.data.email,
                        password: "", // Password shouldn't be pre-filled for security reasons
                    });
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        } else {
            setFormData({
                name: "",
                email: "",
                password: "",
            });
        }
    }, [userId]);

    // Mutation for creating a user
    const createUserMutation = useMutation({
        mutationFn: (newUser) => axiosInstance.post("/proxy/users", newUser),
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]); // Invalidate and refetch users data
            router.push("/user-management"); // Redirect to the users list page
        },
        onError: (error) => {
            console.error("Error creating user:", error);
        },
    });

    // Mutation for updating a user
    const updateUserMutation = useMutation({
        mutationFn: (updatedUser) =>
            axiosInstance.put(`/proxy/users/${userId}`, updatedUser),
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            router.push("/user-management"); // Redirect to the users list page after update
        },
        onError: (error) => {
            console.error("Error updating user:", error);
        },
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userId) {
            updateUserMutation.mutate({name:  formData.name}); // Update user
        } else {
            createUserMutation.mutate(formData); // Create new user
        }
    };

    return (
       <div className="min-h-screen bg-gray-100  flex  justify-center items-center">
         <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
            <form key={userId || "new"} onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center">
                    {userId ? "Edit User" : "Create User"}
                </h2>

                {/* Username */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {userId ? "Update User" : "Create User"}
                    </button>
                </div>
            </form>
        </div>
       </div>
    );
};

export default UserForm;
