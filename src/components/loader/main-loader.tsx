import React from "react";

export const MainLoader = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='rounded bg-white p-8 shadow'>
        <h1 className='mb-4 text-2xl font-bold'>Wait a minute</h1>
        <p className='text-gray-600'>
          Resources are still being retrieved from the server...
        </p>
        <div className='mt-5 flex justify-center'>
          <div className='h-10 w-8 animate-spin rounded-full border-t-4 border-blue-400 p-5'></div>
        </div>
      </div>
    </div>
  );
};
