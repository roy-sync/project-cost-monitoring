'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import DashboardContainer from "@/components/dashboard-container";
import { AuthLoader } from "@/components/loader/auth-loader"; // Optional loader if needed
import { getParsedLocalStorageItem } from "@/lib/utils";
import { MainPrompt } from "@/components/loader/main-prompt";
import axiosInstance from "@/axios/axiosInstance";

function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProjectManager, setIsProjectManager] = useState(false);
  const [isProjectOwner, setIsProjectOwner] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false); // New state for tracking user data loading

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { data } = await axios.get('/api/index/user');
        if (data) {
          try {
            const { data: projects } = await axiosInstance.get(`/projects`, {
              params: { owner_id: data.data.ID },
            });
            setIsProjectOwner(projects.data.data.length > 0);
          } catch (projectsError) {
            console.warn("Failed to fetch projects:", projectsError);
            setIsProjectOwner(false); // Default to false if fetching projects fails
          }

          setIsAdmin(data.data.isAdmin);
          setIsProjectManager(data.data.WORK_POSITION === 'Project Manager');

          localStorage.setItem("department", JSON.stringify(data.department));
          localStorage.setItem("user", JSON.stringify(data.data));
          localStorage.setItem("isAdmin", JSON.stringify(data.data.isAdmin));
          setIsAuthenticated(true);
        }
        setUserLoaded(true); // Mark user data as fully loaded
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/auth/login"); // Redirect to login on error
      }
    };

    checkAuthentication();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("department");
    router.push("/auth/login"); // Redirect to login
  };

  if (!userLoaded) {
    return <AuthLoader />; // Show a loader until user data is fully loaded
  }

  console.log(`isAdmin: ${isAdmin}`);
  console.log(`isProjectManager: ${isProjectManager}`);
  console.log(`isProjectOwner: ${isProjectOwner}`);
  

  if (userLoaded && !isProjectManager) {
    return (
      <MainPrompt
        title="Access Denied"
        message="You are not an Admin! You will be logged out."
        buttonText="OK"
        onButtonClick={handleLogout}
      />
    );
  }

  return <DashboardContainer />; // Render the dashboard once authenticated and authorized
}

export default Home;
