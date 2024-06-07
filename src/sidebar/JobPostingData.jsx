import React from "react";
import InputField from "../components/InputField";

const JobPostingData = ({ handleChange }) => {
  // Get the current date and time
const now = new Date();
console.log(now)
// Calculate the date and time 24 hours ago
const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);

// Calculate the date and time 7 days ago
const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

// Calculate the date and time 30 days ago
const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);


  //convert date to string
  const twentyFourHoursAgoDate = twentyFourHoursAgo.toISOString().slice(0, 10);
  const SevenDaysAgoDate = sevenDaysAgo.toISOString().slice(0, 10);
  const ThirtyDaysAgoDate = thirtyDaysAgo.toISOString().slice(0, 10);

console.log({handleChange})
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Date of Posting</h4>
      <div className="flex flex-col gap-2">
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="test"
            id="test"
            value=""
            onChange={handleChange}
          />
          <span className="checkmark px-2"></span>All time
        </label>

        <InputField
          handleChange={handleChange}
          value={twentyFourHoursAgoDate}
          title="Last 24 hours"
          name="test"
        />

        <InputField
          handleChange={handleChange}
          value={SevenDaysAgoDate}
          title="Last 7 days"
          name="test2"
        />

        <InputField
          handleChange={handleChange}
          value={ThirtyDaysAgoDate}
          title="Last Month"
          name="test3"
        />
      </div>
    </div>
  );
};

export default JobPostingData;
