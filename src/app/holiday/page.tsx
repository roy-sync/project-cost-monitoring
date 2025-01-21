"use client";

import HolidayContainer from "@/components/holiday/holiday-container";
import { getParsedLocalStorageItem } from "@/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Auth {
  empId: number;
  isAdminStaff: boolean;
}

const Productivity = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAdminStaff, setIsAdminStaff] = useState(false);
  const [empId, setEmpId] = useState(0);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const deptInfo = getParsedLocalStorageItem('department');
        const userInfo = getParsedLocalStorageItem('user');
        const { data } = await axios.get("/api/index/user");
        setIsAdminStaff(data.isAdmin); // Set admin status
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/auth/login"); // Redirect on API failure
      } finally {
        setIsCheckingAuth(false); // End loading state
      }
    };

    checkAuthentication();
  }, [router, status]);

  // Set employee data when the session is available
  useEffect(() => {
    if (session) {
      setEmpId(Number(session.user.ID));
      setIsAdminStaff(session.user.ADMIN);
    }
  }, [session]);

  // Show loading while checking authentication or session status
  if (status === "loading" || isCheckingAuth) {
    return <div>Loading...</div>;
  }

  // Handle rendering based on conditions
  if (
    (isAdminStaff && !session) || // Admin staff without session
    (!isAdminStaff && session)    // Non-admin staff with session
  ) {
    return <HolidayContainer />;
  }

  // Redirect cases
  if (!isAdminStaff) {
    router.push("/"); // Non-admin staff
  } else if (!session) {
    router.push("/auth/login"); // Admin staff without session
  }

  return null; // Fallback
};

export default Productivity;
