"use client";

export const MainProjectCard = () => {
  return (
    <div className='m-5 flex rounded-xl border shadow-md'>
      <div className='flex-2 flex items-center justify-center border-r'>
        <div className='p-4'>
          <h5 className='text-5xl font-bold'>27</h5>
          {/* Rest of the code */}
        </div>
      </div>
      <div className='flex-8'>
        <div className='flex items-center justify-center p-4'>
          <h5 className='text-1xl mt-2 font-semibold text-neutral-700'>
            Total Active Projects
          </h5>
        </div>
      </div>
    </div>
  );
};
