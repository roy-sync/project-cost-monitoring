"use client"
import React, { useEffect } from "react";
import Select from "react-select";
import SearchInput from "../projects/search";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setCreatedByOptions,
  setResponsibleOptions,
  setTagOptions,
  setSelectedCreatedBy,
  setSelectedResponsible,
  setSelectedTag,
  resetAllSelected,
} from "@/redux/features/filters-slice";
import { Tasks } from "@/models/task";
import { RootState } from "@/redux/store";

type SearchContainerProps = {
  handleSearchChange: (value: string) => void;
  table: any;
  projectId: number;
};

const fetchFilterData = async (project_id: number) => {
  const res = await fetch(
    `http://206.189.147.71:10100/api/projects/${project_id}`
  );
  return res.json();
};

const TaskListCard = ({
  table,
  handleSearchChange,
  projectId,
}: SearchContainerProps) => {
  const dispatch = useAppDispatch();

  const selectorCreatedBy = (state: RootState) => state.filter.createdByOptions;
  const createdByOptions = useAppSelector(selectorCreatedBy);

  const selectorResponsible = (state: RootState) =>
    state.filter.responsibleOptions;
  const responsibleOptions = useAppSelector(selectorResponsible);

  const selectorTag = (state: RootState) => state.filter.tagOptions;
  const tagOptions = useAppSelector(selectorTag);

  const selectorCreate = (state: RootState) => state.filter.selectedCreatedBy;
  const selectedCreatedBy = useAppSelector(selectorCreate);

  const selectorRes = (state: RootState) => state.filter.selectedResponsible;
  const selectedResponsible = useAppSelector(selectorRes);

  const selectorSelTag = (state: RootState) => state.filter.selectedTag;
  const selectedTag = useAppSelector(selectorSelTag);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const filters = await fetchFilterData(projectId);

        // extract and store the filter properties

        const createdBySet = new Set(
          filters.data.tasks.map((task: Tasks) => task.created_by)
        );
        const createdBy = Array.from(createdBySet).map((value) => ({
          value: value,
          label: value,
        }));

        const responsibleBySet = new Set(
          filters.data.tasks.map((task: Tasks) => task.assigned_to)
        );
        const responsible = Array.from(responsibleBySet).map((value) => ({
          value: value,
          label: value,
        }));

        dispatch(setCreatedByOptions(createdBy));
        dispatch(setResponsibleOptions(responsible));
        // dispatch(setTagOptions(filters.tagOptions));
      } catch (error) {
        console.error("Failed to fetch filter data:", error);
        // Handle error case
      }
    };

    fetchFilters();
  }, [projectId, dispatch]);

  const handleCreatedByChange = (selected: any) => {
    table.getColumn("created_by")?.setFilterValue(selected.value);
    dispatch(setSelectedCreatedBy(selected));
  };

  const handleResponsibleChange = (selected: any) => {
    table.getColumn("assigned_to")?.setFilterValue(selected.value);
    dispatch(setSelectedResponsible(selected));
  };

  const handleTagChange = (selected: any) => {
    table.getColumn("tag")?.setFilterValue(selected.value);
    dispatch(setSelectedTag(selected));
  };

  const resetFilters = (filterType?: number) => {
    if (filterType === 1) {
      dispatch(setSelectedCreatedBy({ value: "", label: "Created By" }));
      table.getColumn("created_by")?.setFilterValue("");
    } else if (filterType === 2) {
      dispatch(setSelectedResponsible({ value: "", label: "Responsible" }));
      table.getColumn("assigned_to")?.setFilterValue("");
    } else if (filterType === 3) {
      dispatch(setSelectedTag({ value: "", label: "Tag" }));
      table.getColumn("tag")?.setFilterValue("");
    } else {
      dispatch(resetAllSelected());
      // dispatch(setCreatedByOptions(createdBy));
      // dispatch(setResponsibleOptions(responsible));
      // dispatch(setTagOptions(tag));
      table.setColumnFilters([]);
    }
  };

  return (
    <div className="my-5 rounded-xl border shadow">
      <div className="flex justify-between">
        <p className="text-md mt-5 px-5 font-semibold text-slate-900">
          Task List
        </p>
        <div className="flex">
          {selectedCreatedBy && selectedCreatedBy.value !== "" && (
            <span className="mx-1 my-5 rounded-full bg-neutral-500 px-4 py-2 text-xs text-slate-50">
              {selectedCreatedBy ? selectedCreatedBy.label : ""}
              <button
                onClick={() => resetFilters(1)}
                className="ml-2 hover:text-slate-500"
              >
                x
              </button>
            </span>
          )}

          {selectedResponsible && selectedResponsible.value !== "" && (
            <span className="mx-1 my-5 rounded-full bg-neutral-500 px-4 py-2 text-xs text-slate-50">
              {selectedResponsible.label}
              <button
                onClick={() => resetFilters(2)}
                className="ml-2 hover:text-slate-500"
              >
                x
              </button>
            </span>
          )}

          {selectedTag && selectedTag.value !== "" && (
            <span className="mx-1 my-5 rounded-full bg-neutral-500 px-4 py-2 text-xs text-slate-50">
              {selectedTag.value}
              <button
                onClick={() => resetFilters(3)}
                className="ml-2 hover:text-slate-500"
              >
                x
              </button>
            </span>
          )}
          <button
            onClick={() => resetFilters()}
            className="mx-1 my-5 px-4 py-2 text-xs text-slate-900 hover:text-slate-950"
          >
            Clear All
          </button>
        </div>
      </div>
      <div className="mb-5 flex items-center">
        <SearchInput
          placeholder="Search task..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={handleSearchChange}
        />

        <div className="mx-2 mb-3 flex">
          <Select
            options={createdByOptions}
            onChange={handleCreatedByChange}
            value={selectedCreatedBy}
            className="w-xs mt-3 rounded-full px-2"
            classNamePrefix="select"
            placeholder="Created By"
          />
          <Select
            options={responsibleOptions}
            onChange={handleResponsibleChange}
            value={selectedResponsible}
            className="w-xs mt-3 rounded-full px-2"
            placeholder="Responsible"
          />
          <Select
            options={tagOptions}
            onChange={handleTagChange}
            value={selectedTag}
            className="w-xs mt-3 rounded-full px-2"
            classNamePrefix="select"
            placeholder="Tag"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskListCard;
