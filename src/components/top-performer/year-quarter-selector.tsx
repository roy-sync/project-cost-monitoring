import React from 'react';

// Utility function to generate an array of years
const generateYears = (range: number): number[] => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - range; i <= currentYear + range; i++) {
    years.push(i);
  }
  return years;
};

// Options for the quarters
const quarters = [
  { value: 'Q1', label: 'First Quarter (Q1)' },
  { value: 'Q2', label: 'Second Quarter (Q2)' },
  { value: 'Q3', label: 'Third Quarter (Q3)' },
  { value: 'Q4', label: 'Fourth Quarter (Q4)' }
];

const YearQuarterSelector: React.FC = () => {
  const years = generateYears(5);
  const [selectedYear, setSelectedYear] = React.useState<string>(years[0].toString());
  const [selectedQuarter, setSelectedQuarter] = React.useState<string>(quarters[0].value);

  const handleSubmit = () => {
    alert(`Selected Year: ${selectedYear}, Selected Quarter: ${selectedQuarter}`);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label htmlFor="year" className="block text-gray-700 font-bold mb-2">Select Year</label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label htmlFor="quarter" className="block text-gray-700 font-bold mb-2">Select Quarter</label>
          <select
            id="quarter"
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            {quarters.map((quarter) => (
              <option key={quarter.value} value={quarter.value}>
                {quarter.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-right">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default YearQuarterSelector;
