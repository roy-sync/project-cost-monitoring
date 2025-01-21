import { Projects } from "@/models/projects";
import React from "react";
import ProjectCostCard from "./project-cost-card";
import axiosInstance from "@/axios/axiosInstance";
import ProjectActualCost from "./project-actual-cost-card";
import ProjectProposedHours from "./project-proposal-hour-card";

type ProjectProps = {
  data: Projects;
};
export const ProjectCard = ({ data }: ProjectProps) => {
  const condition = data.total_actual <= data.total_estimate;
  const totalEstimatedClass = `my-5 rounded-xl border bg-green-100 p-3 shadow-md`;
  const totalActualClass = condition
    ? `my-5 rounded-xl border bg-green-100 p-3 shadow-md`
    : `my-5 rounded-xl border bg-red-100 p-3 shadow-md`;
  const totalActualAmount = condition
    ? `text-lg font-bold text-neutral-900`
    : "text-lg font-bold text-red-900";
  const totalActualLabel = condition
    ? `text-bold text-sm uppercase text-green-600`
    : `text-bold text-sm uppercase text-red-600`;

  const onTotalCostChange = async (newTotalCost: number) => {
    try {

      const params = { 'project_id': data.id, 'cost': newTotalCost }
      await axiosInstance.post(`/projects/cost-updated`, params);
    } catch (err: any) {
      console.log(err);
    }
  }

  const onActualCostChange = async (newTotalActualCost: number) => {
    try {

      const params = { 'project_id': data.id, 'cost': newTotalActualCost }
      await axiosInstance.post(`/projects/actual-cost-updated`, params);
    } catch (err: any) {
      console.log(err);
    }
  }

  const onProposalHoursChange = async (newProposedHours: number) => {
    try {

      const params = { 'project_id': data.id, 'proposal_hours': newProposedHours }
      await axiosInstance.post(`/projects/proposal-hours-updated`, params);
    } catch (err: any) {
      console.log(err);
    }
  }


  return (
    <>
      <div className='mx-3 my-10 rounded-xl border p-5 shadow-md'>
        <div className='flex justify-between'>
          <p className='uppercase text-neutral-500'>project name</p>
          <p className='rounded-full bg-green-100 px-2 text-green-700'>
            Active
          </p>
        </div>
        <p className='ml-2 mt-3 w-1/2 py-5 text-lg font-bold uppercase text-neutral-900'>
          {data.title}
        </p>
        <div className='my-2 rounded-xl border bg-neutral-100 p-3 shadow-md'>
          <p className='text-bolder text-sm uppercase text-neutral-500'>
            Project Date Start
          </p>
          <p className='text-lg font-bold text-neutral-900'>{data.date_start}</p>
        </div>
        <div className='my-5 rounded-xl border bg-neutral-100 p-3 shadow-md'>
          <p className='text-bold text-sm uppercase  text-neutral-500'>
            expected date to close
          </p>
          <p className='text-lg font-bold text-neutral-900'>
            {(data.updated_date_closed == null) ? data.initial_date_closed : data.updated_date_closed}
          </p>
        </div>
        <div className={totalEstimatedClass}>
          <p className='text-bold text-sm uppercase text-green-600'>
            total estimated hours
          </p>
          <p className='text-lg font-bold text-neutral-900'>
            {data.total_estimate} hrs
          </p>
        </div>
        <div className="my-5 rounded-xl border bg-green-100 p-3 shadow-md">
          <p className="text-bold text-sm uppercase text-green-600">total actual hours</p>
          <p className="text-lg font-bold text-neutral-900">{data.total_actual} hrs</p>
        </div>

        <ProjectCostCard total_cost={data.cost} onTotalCostChange={onTotalCostChange} />

        <ProjectActualCost actual_cost={data.actual_cost} onActualCostChange={onActualCostChange}/>

        <ProjectProposedHours proposal_hours={data.proposal_hours} onProposalHoursChange={onProposalHoursChange}/>

        <p className='text-bold p-3 text-sm text-red-700'>
          Reminder: Actual Hours Exceed Estimated Hours
        </p>
      </div>
    </>
  );
};
