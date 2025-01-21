import React, { useState } from "react";

interface Tab {
  title: string;
  content: JSX.Element;
}

type TabProps = {
  defaultIndex: number;
  tabs: Tab[];
};

const Tabs: React.FC<TabProps> = ({ defaultIndex, tabs }) => {
  const [activeTab, setActiveTab] = useState(defaultIndex);

  const changeTab = (index: number) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className='mx-5'>
        <nav className='space-x-4 border-b border-gray-200'>
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`font-neutral-900 p-3  ${
                activeTab === index
                  ? "mt-5 rounded-t-lg bg-gray-300 font-semibold"
                  : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
              }`}
              onClick={() => changeTab(index)}
            >
              {tab.title}
            </button>
          ))}
        </nav>
      </div>
      <div className='no-scrollbar h-screen overflow-auto px-5'>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
