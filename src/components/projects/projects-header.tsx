"use client";
import React, { useState } from "react";
import Select from "react-select";
import SearchInput from "./search";

type SearchContainerProps = {
  handleSearchChange: (value: string) => void;
  table: any;
};
export const ProjectSearchContainer = ({
  table,
  handleSearchChange,
}: SearchContainerProps) => {
  const filterClass = "px-5 w-xs mt-3";
  const filter = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const statusDefault = { value: "", label: "Status" };
  const [status, setStatus] = useState(statusDefault);

  // filter projs (temp)
  const handleChange = (selected: any) => {
    // data from API uses Y and N for status | Y = active, N = inactive
    table
      .getColumn("closed")
      ?.setFilterValue(selected.value === "active" ? "N" : "Y");
    setStatus(selected);
  };

  const resetFilters = () => {
    // reset states for selects
    // hide badgees

    setStatus(statusDefault);
    table.setColumnFilters([]);
  };
  return (
    <div>
      <div className='flex justify-between'>
        <p className='text-md mt-5 px-5 font-semibold text-slate-900'>
          Project List
        </p>
        <div className='flex'>
          {status && status.value !== "" ? (
            <span className='mx-1 my-5 rounded-full bg-neutral-500 px-4 py-2 text-xs text-slate-50'>
              {status ? status.label : ""}
              <button
                onClick={resetFilters}
                className='ml-2 hover:text-slate-500'
              >
                x
              </button>
            </span>
          ) : null}
          <button
            onClick={() => resetFilters()}
            className='mx-1 my-5 px-4 py-2 text-xs text-slate-900 hover:text-slate-950'
          >
            Clear All
          </button>
        </div>
      </div>
      <div className='mb-5 flex items-center'>
        <SearchInput
          placeholder='Search projects...'
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={handleSearchChange}
        />

        <div className='mb-3 ml-10 flex'>
          <p className='mt-5 text-sm text-slate-700'>Filter</p>
          <Select
            options={filter}
            onChange={handleChange}
            value={status}
            className={filterClass}
            classNamePrefix='select'
            placeholder='Status'
          />
        </div>
      </div>
    </div>
  );
};
