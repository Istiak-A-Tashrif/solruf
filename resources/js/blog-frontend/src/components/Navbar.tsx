"use client";
import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const router = useRouter();

  const navigateToAdminDashboard = () => {
    router.push("/admin");
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-2 shadow-md flex justify-between items-center">
      <div>
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Blog Platform
        </h1>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={navigateToAdminDashboard}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-blue-100"
        >
          Admin Dashboard
        </button>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
