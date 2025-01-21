"use client";

import ProjectListTable from "@/components/projects/projects-table";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProjectList = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { data } = await axios.get("/api/index/user");
        setIsAdmin(data.isAdmin); // Store admin status
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/auth/login"); // Redirect on API failure
      } finally {
        setIsCheckingAuth(false); // End loading state
      }
    };

      checkAuthentication();
  }, [router, status]);

  // Show loading while checking authentication or session status
  if (status === "loading" || isCheckingAuth) {
    return <div>Loading...</div>;
  }

  console.log("!isAdmin && !session");
  console.log(!isAdmin && !session);
  
  // Handle rendering based on conditions
  if (
    (isAdmin && !session) || // Admin without session
    (!isAdmin && session) || (!isAdmin && !session)    // Non-admin with session
  ) {

    return <ProjectListTable />;
  }else{
    router.push("/");
  }

  // Redirect cases
  if (!session ) {
    router.push("/auth/login"); // Admins without session
  }

  return null; // Fallback
};

export default ProjectList;
