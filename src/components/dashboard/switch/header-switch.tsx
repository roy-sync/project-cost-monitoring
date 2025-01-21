"use client";
import React, { useEffect, useState } from "react";

export const HeaderSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    return () => {
      setIsOn(false);
    };
  }, []);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className='mx-auto mr-5 flex'>
      <div
        className={`h-10 w-40  rounded-full p-1 transition duration-300 ease-in-out ${
          isOn ? "bg-blue-300" : "bg-gray-200"
        }`}
        onClick={toggleSwitch}
      >
        <div className='flex justify-between'>
          <div
            className={`h-8 w-20 transform rounded-full bg-white text-center  shadow-md transition-all duration-300 ease-in-out ${
              isOn ? "translate-x-16" : "translate-x-0"
            }`}
          >
            <span className='flex h-full items-center justify-center font-semibold text-neutral-500'>
              {isOn ? "Active" : "Inactive"}
            </span>
          </div>
          <span className='mx-auto mt-1 text-center font-semibold text-neutral-500'>
            Active
          </span>
        </div>
      </div>
    </div>
  );
};
