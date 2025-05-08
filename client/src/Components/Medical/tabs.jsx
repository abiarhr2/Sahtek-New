// src/components/Tabs.js
import React from "react";

const Tabs = ({ selectedTab, onSelect }) => {
  const tabs = ["All Records", "Diagnoses", "Lab Results", "Procedures", "Vaccinations"];

  return (
    <div className="flex gap-4 mb-4 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className={`pb-2 border-b-2 ${
            selectedTab === tab
              ? "border-purple-600 text-purple-600 font-medium"
              : "border-transparent text-gray-600"
          } hover:text-purple-500 transition`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
