"use client";

type SwitchProps = {
  activeLabel: string;
  inactiveLabel: string;
  switchState: boolean;
  toggleHandler?: () => void;
};

export const MainSwitch = ({
  activeLabel,
  inactiveLabel,
  switchState,
  toggleHandler,
}: SwitchProps) => {
  // const [isOn, setIsOn] = useState(false);
  // const toggleSwitch = () => {
  //   setIsOn(!isOn);
  // };

  return (
    <div className='mx-auto flex'>
      <div
        className={`h-10 w-40  rounded-full bg-gray-200 p-1 transition duration-300 ease-in-out`}
        onClick={toggleHandler}
      >
        <div className='flex justify-between'>
          {switchState && (
            <span className='absolute mx-auto ml-2 mt-1 text-center font-semibold text-neutral-500 '>
              {activeLabel}
            </span>
          )}
          <div
            className={`ml-2 h-8 w-20 transform rounded-full bg-white text-center  shadow-md transition-all duration-300 ease-in-out ${
              switchState ? "translate-x-16" : "translate-x-0"
            }`}
          >
            <span className='flex h-full items-center justify-center font-semibold text-neutral-500'>
              {switchState ? inactiveLabel : activeLabel}
            </span>
          </div>
          {!switchState && (
            <span className='mx-auto mt-1 text-center font-semibold text-neutral-500 '>
              {inactiveLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
