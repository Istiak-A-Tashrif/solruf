"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Start with null to check loading state
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("jwt_token");
      if (!token) {
        router.push('/login'); // Redirect if not authenticated
      } else {
        setIsAuthenticated(true); // Update state if authenticated
      }
    }
  }, [router]);

  // Return null to indicate that we are still checking authentication status
  // or return the actual authentication state if already determined.
  return isAuthenticated;
};

export default useAuth;
