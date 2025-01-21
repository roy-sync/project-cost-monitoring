"use client";

import TopPerformerCard from "./top-performer-card";
import YearQuarterSelector from "./year-quarter-selector";

const TopPerformerMain = () => {

  return (
    <div className='p-4'>
      <YearQuarterSelector/>
      <h1 className="text-3xl font-bold mb-6 text-center mt-3">Top Performers of the Quarter</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <TopPerformerCard 
          name="John Green" 
          incomeProductivity="115%" 
          efficiencyProductivity="100%" 
        />
        <TopPerformerCard 
          name="John Green" 
          incomeProductivity="115%" 
          efficiencyProductivity="100%" 
        />
        <TopPerformerCard 
          name="John Green" 
          incomeProductivity="115%" 
          efficiencyProductivity="100%" 
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mt-5">
        <TopPerformerCard 
          name="John Green" 
          incomeProductivity="115%" 
          efficiencyProductivity="100%" 
        />
        <TopPerformerCard 
          name="John Green" 
          incomeProductivity="115%" 
          efficiencyProductivity="100%" 
        />
        <TopPerformerCard 
          name="John Green" 
          incomeProductivity="115%" 
          efficiencyProductivity="100%" 
        />
        <TopPerformerCard 
          name="John Green" 
          incomeProductivity="115%" 
          efficiencyProductivity="100%" 
        />
        <TopPerformerCard 
          name="John Green" 
          incomeProductivity="115%" 
          efficiencyProductivity="100%" 
        />
      </div>
      
    </div>
  );
};

export default TopPerformerMain;
