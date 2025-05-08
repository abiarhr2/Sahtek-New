// src/components/RecordCard.js
import React from "react";

const RecordCard = ({ record }) => {
  const formattedDate = new Date(record.date).toLocaleDateString();

  const iconMap = {
    "General Health Assessment": "🩺",
    "Comprehensive Laboratory Testing": "🧪",
    "Immunology Assessment": "🌿",
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4 border">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            {iconMap[record.category] || "📄"} {record.type}
          </h2>
          <p className="text-sm text-gray-500">{record.category}</p>
        </div>
        <p className="text-sm text-gray-400">{formattedDate}</p>
      </div>
      <div className="mt-2 text-sm text-gray-700">
        <p><strong>Provider:</strong> {record.provider}</p>
        <p><strong>Facility:</strong> {record.facility}</p>
        <p className="mt-2">{record.summary}</p>
      </div>
      <div className="flex justify-end gap-4 mt-4 text-sm text-purple-600">
        <button className="hover:underline">📄 View Details</button>
        <button className="hover:underline">⬇ Download Report</button>
      </div>
    </div>
  );
};

export default RecordCard;
