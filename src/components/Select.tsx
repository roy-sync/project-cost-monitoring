import React, { useState, ChangeEvent } from "react";

interface Option {
  value: string;
  label: string;
}

interface DynamicSelectProps {
  options: Option[];
  onChangeYear: (newYear: number) => void;
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({
  options,
  onChangeYear,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectOptions, setSelectOptions] = useState<Option[]>(options);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    onChangeYear(parseInt(event.target.value));
  };

  return (
    <div className='my-4 w-48 rounded-md border border-gray-300 p-4'>
      <label className='mb-2 block text-sm font-semibold'>Select a Year:</label>
      <select
        className='w-full rounded-md border border-gray-300 p-2'
        value={selectedValue}
        onChange={handleSelectChange}
      >
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DynamicSelect;
