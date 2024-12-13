"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname(); // Get the current route

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("jwt_token");

      if (token) {
        setIsAuthenticated(true);
      } else if (pathname !== "/login") {
        router.replace("/login"); // Replace instead of push to prevent history stacking
      }

      setIsLoading(false); // End loading state
    };

    // Execute only once when the component mounts
    checkAuth();
  }, [pathname, router]);

  return { isAuthenticated, isLoading };
};

export default useAuth;
