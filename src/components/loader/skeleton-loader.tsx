import React from "react";

const variants = ["h1"];

type SkeletonLoaderProps = {
  loading: boolean;
};

const SkeletonLoader = ({ loading }: SkeletonLoaderProps) => {
  return (
    <div>
      {variants.map((variant) => (
        <div key={variant} className='mb-4'>
          {loading ? (
            <div className='mb-2 h-4  animate-pulse rounded bg-gray-300'></div>
          ) : (
            <div className={`text-${variant} font-bold`}>{variant}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
