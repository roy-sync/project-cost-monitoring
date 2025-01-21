"use client";
import React, { useEffect, useState } from "react";
import { Holiday } from "@/models/holiday";

interface DataTableProps {
  data: Holiday[];
  onDelete: ( id: string ) => void;
  onUpdate: (id: string, name: string, date: Date) => void;
}

export function DataTableHoliday({
  data,
  onDelete,
  onUpdate
}: DataTableProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data.length !== 0) {
      setLoading(false);
    }
  }, [data]);

  return (
    <>

      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.date}</td>
              <td className="py-2 px-4 border-b">
              <div className="flex">
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4" onClick={() => {onDelete(item.id.toString())}}>
                      Delete
                  </button>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
