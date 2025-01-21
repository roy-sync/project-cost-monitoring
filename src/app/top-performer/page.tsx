"use client";

import TopPerformerMain from "@/components/top-performer/top-performer-main";
import { getParsedLocalStorageItem } from "@/lib/utils";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TopPerformer = () => {
  const router = useRouter();


  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const deptInfo = getParsedLocalStorageItem('department');
    const userInfo = getParsedLocalStorageItem('user');
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

  // Handle rendering based on conditions
  if (
    (isAdmin && !session) || // Admin without session
    (!isAdmin && session)    // Non-admin with session
  ) {
    return <TopPerformerMain />;
  }

  // Redirect cases
  if (!isAdmin) {
    router.push("/"); // Non-admin users
  } else if (!session) {
    router.push("/auth/login"); // Admins without session
  }

  return null; // Fallback
};

export default TopPerformer;
