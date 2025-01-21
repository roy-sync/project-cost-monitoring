"use client";
import AttendanceContainer from "@/components/attendance/attendance-container";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Attendance = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { data } = await axios.get("/api/index/user");
        setIsAdmin(data.isAdmin); // Set admin status
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/auth/login"); // Redirect on API failure
      } finally {
        setIsCheckingAuth(false); // End loading state
      }
    };

    checkAuthentication()

  }, [router, status]);

  // Show loading while checking session or authentication status
  if (status === "loading" || isCheckingAuth) {
    return <div>Loading...</div>;
  }

  // Handle the rendering based on conditions
  if (
    (isAdmin && !session) || // Admin without session
    (!isAdmin && session)    // Non-admin with session
  ) {
    return <AttendanceContainer />;
  }

  // Redirect cases
  if (!isAdmin) {
    router.push("/"); // Non-admin users
  } else if (!session) {
    router.push("/auth/login"); // Admins without session
  }

  return null; // Fallback
};

export default Attendance;
