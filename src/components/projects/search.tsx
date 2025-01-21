import React from "react";
import { Input } from "@/components/table/input";

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className='flex items-center px-5'>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        className='max-w-sm'
      />
    </div>
  );
};

export default SearchInput;
