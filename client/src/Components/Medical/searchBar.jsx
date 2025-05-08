// src/components/SearchBar.js
import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search records..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  );
};

export default SearchBar;
