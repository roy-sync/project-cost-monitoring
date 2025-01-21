import React from 'react';

interface TopPerformerCardProps {
  name: string;
  incomeProductivity: string;
  efficiencyProductivity: string;
  imageUrl?: string;
}

const TopPerformerCard: React.FC<TopPerformerCardProps> = ({
  name,
  incomeProductivity,
  efficiencyProductivity,
  imageUrl = 'https://amaxfireandsecurity.co.uk/wp-content/uploads/2023/12/profile-pic-MD-300x300.jpg',
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <img
        className="w-full"
        src={imageUrl}
        alt={`${name}'s picture`}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">{name}</div>
        <p className="text-gray-700 text-base">
          <strong>Income Productivity:</strong> {incomeProductivity}
        </p>
        <p className="text-gray-700 text-base">
          <strong>Efficiency Productivity:</strong> {efficiencyProductivity}
        </p>
      </div>
    </div>
  );
};

export default TopPerformerCard;
