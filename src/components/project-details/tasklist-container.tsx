"use client";
import axiosInstance from "@/axios/axiosInstance";
import { Projects } from "@/models/projects";
import { useEffect, useState } from "react";
import TaskListTable from "./tasklist-table";
import { ProjectCard } from "./project-card";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
type ProjectProps = {
  data: Projects;
};
const TaskListContainer = ({ project_id }: { project_id: number }) => {
  const [project, setProject] = useState<ProjectProps>();

  useEffect(() => {
    const controller = new AbortController();
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

  // const router = useRouter();

  // const { data: session, status } = useSession();
  // if (status === "loading") {
  //   return <></>;
  // }

  // if (session) {

  console.log("projects: ", project);
  if (project) {
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
    // router.push("/auth/login");
    return <p>No Projects</p>;
  }
};

export default TaskListContainer;
