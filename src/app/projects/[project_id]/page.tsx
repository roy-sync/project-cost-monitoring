"use client";
import { Projects } from "@/models/projects";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/axios/axiosInstance";
import { ProjectCard } from "@/components/project-details/project-card";
import TaskListTable from "@/components/project-details/tasklist-table";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { getParsedLocalStorageItem } from "@/lib/utils";

type ProjectDetailsProps = {
  params: { project_id: number };
};

type ProjectProps = {
  data: Projects;
};
export default function ProjectDetails({ params }: ProjectDetailsProps) {
  const { project_id } = params;

  const [project, setProject] = useState<ProjectProps>();

  useEffect(() => {
    const controller = new AbortController();

    const deptInfo = getParsedLocalStorageItem('department');
    const userInfo = getParsedLocalStorageItem('user');

    const getProjects = async (project_id: number) => {
      try {
        const res = await axiosInstance.get(`/projects/${project_id}`);

        const { data } = res;
        if (data) {
          setProject(data);
        }
      } catch (err: any) {
        console.log(err);
        // throw new Error(err.message);
      }
    };
    if (project_id) {
      getProjects(project_id);
    }

    return () => {
      // cancel request on unmount
      controller.abort();
    };
  }, [project_id]);

  const router = useRouter();

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <></>;
  }

  if (session) {
    return (
      <div className='grid grid-cols-7 gap-0'>
        <div className='col-span-2'>
          {project && <ProjectCard data={project?.data} />}
        </div>
        <div className='col-span-5'>
          <TaskListTable
            task={project && project?.data.tasks ? project?.data.tasks : []}
            projectId={project_id}
          />
        </div>
      </div>
    );
  } else {
    router.push("/auth/login");
    return <></>;
  }
}

export async function generateStaticParams() {
  // responsible for generating static page
  const res = await axiosInstance.get(`/projects`);
  const projects = await res.data;
  if (projects)
    return projects.data.map((p: Projects) => ({
      project_id: p.id.toString(),
    }));
}
