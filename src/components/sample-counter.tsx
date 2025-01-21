"use client";
type CounterProps = {
  value: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

function SampleCounter({ value, increment, decrement, reset }: CounterProps) {
  return (
    <>
      <p className='border text-red-500'>value: {value}</p>
      <button onClick={() => reset()}>reset</button>
      <button onClick={() => increment()}>increment</button>
      <button onClick={() => decrement()}>decrement</button>
    </>
  );
}

export default SampleCounter;
