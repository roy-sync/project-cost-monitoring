// components/SearchInput.js
import { Filter } from "@/models/productivity/filter";
import React, { useState } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  filterChange: () => void;
  lists: Filter[];
  placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  filterChange,
  lists,
  placeholder,
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    value = e.target.value;
    onChange(value);
    setDropdownOpen(true);
  };

  const handleNameClick = (name: string) => {
    onChange(name);
    setDropdownOpen(false);
    filterChange();
  };
  return (
    <div className='relative my-1 text-gray-600'>
      <input
        type='text'
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className='h-10 w-full rounded-lg border-2 border-gray-300 bg-white px-5 pr-16 text-sm focus:outline-none'
        onFocus={handleInputChange}
        onBlur={() => {
          setTimeout(() => setDropdownOpen(false), 200);
          filterChange();
        }}
      />
      {isDropdownOpen && (
        <div className='absolute z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg'>
          {lists.map((list) => (
            <div
              key={list.name}
              onClick={() => handleNameClick(list.name)}
              className='cursor-pointer px-4 py-2 hover:bg-gray-100'
            >
              {list.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
