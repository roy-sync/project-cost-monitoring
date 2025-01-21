"use client";
type CommonProjectCardProp = {
  total: number;
  subtext: string;
};

export const ClosedProjectCard = ({
  total,
  subtext,
}: CommonProjectCardProp) => {
  const gradientColorClass = `bg-gradient-to-b from-red-400 to-red-500`;
  return (
    <div
      className={`m-5 flex rounded-xl border-2 border-red-600 ${gradientColorClass} items-center pb-2 pt-1 shadow-md`}
    >
      <div className='flex-2 flex justify-center'>
        <div className='p-4'>
          <h5 className='text-3xl font-bold'>{total}</h5>
          {/* Rest of the code */}
        </div>
      </div>
      <div className='flex-8'>
        <div className='flex justify-center p-4'>
          <h5 className='text-md font-normal text-neutral-700'>{subtext}</h5>
        </div>
      </div>
    </div>
  );
};
