import React from "react";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addEmployeeToMultiSearch } from "@/redux/features/attendance-slice";
import { Employee } from "@/models/attendance/employee";

export const SearchForm = () => {
  const attendaneSelector = (state: RootState) => state.attendance.employees;

  const employees = useSelector(attendaneSelector);
  const uniqueEmployees = (arr: Employee[]) => {
    const result = [];
    const seen = new Set();

    for (const employees of arr) {
      const key = employees["fullname"];
      if (!seen.has(key)) {
        seen.add(key);
        result.push(employees);
      }
    }
    return result;
  };

  const uniqueEmployeeList: Employee[] = uniqueEmployees(employees);

  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addEmployeeToMultiSearch(name));
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex'>
      <div className='relative h-full flex-grow'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex h-full items-center pl-3'>
          <svg
            className='h-4 w-4 text-gray-700 dark:text-gray-700'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
        <input
          type='text'
          id='default-search'
          className='block h-full w-full rounded border border-gray-100 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-300  dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          placeholder='Search'
          required
          autoComplete='off'
          list='employeeName'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <datalist
          id='employeeName'
          role='listbox'
          className='w-full rounded border border-gray-100 bg-gray-50 p-2 pl-10 text-sm text-gray-900'
        >
          {uniqueEmployeeList.map((entry, index) => (
            <option
              value={`${entry.name.first} ${entry.name.last}`}
              key={entry.id}
            />
          ))}
        </datalist>
      </div>
      <button
        type='submit'
        className='mx-1 flex-grow rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
      >
        Submit
      </button>
    </form>
  );
};
