import React from "react";
import InputField from "../components/InputFieldFilter";

const JobPostingData = ({ selectedFilters, handleChange }) => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  const options = [
    { value: "", title: "All time" },
    {
      value: twentyFourHoursAgo.toISOString().slice(0, 10),
      title: "Last 24 hours",
    },
    { value: sevenDaysAgo.toISOString().slice(0, 10), title: "Last 7 days" },
    { value: thirtyDaysAgo.toISOString().slice(0, 10), title: "Last Month" },
  ];

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Date of Posting</h4>
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <InputField
            key={option.value}
            handleChange={handleChange}
            value={option.value}
            title={option.title}
            checked={selectedFilters.includes(option.value)}
          />
        ))}
      </div>
    </div>
  );
};

export default JobPostingData;
