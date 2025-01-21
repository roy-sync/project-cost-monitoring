"use client";
import axios from "axios";
import YearlyProductivityTable from "../../../components/productivity/yearly/yearly-productivity-table";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getParsedLocalStorageItem } from "@/lib/utils";

const YearlyProductivity = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const deptInfo = getParsedLocalStorageItem('department');
        const userInfo = getParsedLocalStorageItem('user');
        const { data } = await axios.get('/api/index/user');


        if(!data.isAdmin){
          router.push("/"); // Redirect to login on error
        }
      } catch (error) {
        console.error("Authentication error:", error);
        router.push("/auth/login"); // Redirect to login on error
      }
    };

    checkAuthentication();
  }, [router]); // Add router as a dependency

  if (status === "loading") {
    return <></>;
  }
  if (session) {
    return (
      <>
        <YearlyProductivityTable />
      </>
    );
  } else {
    router.push("/auth/login");
    return <></>;
  }
};

export default YearlyProductivity;
