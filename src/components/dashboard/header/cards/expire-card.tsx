"use client";
type CommonProjectCardProp = {
  total: number;
  subtext: string;
};

export const ToExpireProjectCard = ({
  total,
  subtext,
}: CommonProjectCardProp) => {
  const gradientColorClass = `bg-gradient-to-b from-blue-200 to-blue-300`;
  return (
    <div
      className={`mx-1 mt-5 flex rounded-xl border-2 border-blue-400 ${gradientColorClass} flex-2 items-center shadow-md`}
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
