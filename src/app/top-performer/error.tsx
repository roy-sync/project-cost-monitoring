"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // console.error("the error: ", error.name);
  // if(error.message === 'NEXT_NOT_FOUND' ){
  //   return <div>err</div>
  // }
  return (
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='rounded bg-white p-8 shadow'>
        <h1 className='mb-4 text-2xl font-bold'>Page Could Not Be Accessed</h1>
        <p className='text-gray-600'>
          The page you are trying to access does not exist or is currently
          unavailable.
        </p>
      </div>
    </div>
  );
}
