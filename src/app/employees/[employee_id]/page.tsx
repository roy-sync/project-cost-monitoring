"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/axios/axiosInstance";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Employee } from "@/models/employee/employee";
import EmployeeLeaveCard from "@/components/employees/employee-leave-card";
import EmployeeQuotaCard from "@/components/employees/employee-quota-card";
import axios from "axios";
import { getParsedLocalStorageItem } from "@/lib/utils";

type EmpDetailsProps = {
    params: { employee_id: number };
};

type EmployeeProps = {
    data: Employee;
};
export default function EmployeeDetails({ params }: EmpDetailsProps) {
    const router = useRouter();

    const { employee_id } = params;
    const [employee, setEmployee] = useState<EmployeeProps>();

    useEffect(() => {
        const checkAuthentication = async () => {
        try {
            const deptInfo = getParsedLocalStorageItem('department');
            const userInfo = getParsedLocalStorageItem('user');
            const { data } = await axios.get('/api/index/user');
            console.log("🚀 ~ user data:", data);
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


    useEffect(() => {
        const controller = new AbortController();
        const getEmployees = async (project_id: number) => {
            try {
                const res = await axiosInstance.get(`/employees/${employee_id}`);

                const { data } = res;
                if (data) {
                    setEmployee(data);
                }
            } catch (err: any) {
                console.log(err);
                // throw new Error(err.message);
            }
        };
        if (employee_id) {
            getEmployees(employee_id);
        }

        return () => {
            // cancel request on unmount
            controller.abort();
        };
    }, [employee_id]);



    const { data: session, status } = useSession();
    if (status === "loading") {
        return <></>;
    }

    const onTotalCostChange = async (newLeave: number) => {
        try {

            const params = { 'employee_id': employee_id, 'leave': newLeave }
            await axiosInstance.post(`/employees/update-leave`, params);
        } catch (err: any) {
            console.log(err);
        }
    }

    const onTotalQuotaChange = async (newQuota: number) => {
        try {

            const params = { 'employee_id': employee_id, 'quota': newQuota }
            await axiosInstance.post(`/employees/update-quota`, params);
        } catch (err: any) {
            console.log(err);
        }
    }

    if (session) {
        return (
            <div className='mx-2'>

                <div className='mx-3 my-10 rounded-xl border p-5 shadow-md'>
                    <div className='flex justify-between'>
                        <p className='uppercase text-neutral-500'>employee name</p>
                    </div>
                    <p className='ml-2 mt-3 w-1/2 py-5 text-lg font-bold uppercase text-neutral-900'>
                        {employee?.data.full_name}
                    </p>

                    <div className='my-5 rounded-xl border bg-neutral-100 p-3 shadow-md'>
                        <p className='text-bold text-sm uppercase  text-neutral-500'>
                            Work Position
                        </p>
                        <p className='text-lg font-bold text-neutral-900'>
                            {employee?.data.work_position}
                        </p>
                    </div>
                    <div className='my-5 rounded-xl border bg-neutral-100 p-3 shadow-md'>
                        <p className='text-bold text-sm uppercase  text-neutral-500'>
                            Department
                        </p>
                        <p className='text-lg font-bold text-neutral-900'>
                            {employee?.data.department}
                        </p>
                    </div>

                    {employee?.data.leave !== undefined && (
                        <EmployeeLeaveCard
                            total_leave={employee?.data.leave}
                            onTotalLeaveChange={onTotalCostChange}
                        />
                    )}

                    {employee?.data.quota !== undefined && (
                        <EmployeeQuotaCard
                            quota={employee?.data.quota}
                            onTotalQuota={onTotalQuotaChange}
                        />
                    )}
                </div>
            </div>
        );
    } else {
        router.push("/auth/login");
        return <></>;
    }
}

