import React from "react";
import InputField from "../components/InputFieldFilter";

const experienceLevels = ["Senior", "Mid", "Junior", "Intern"];

const ExperienceLevel = ({ selectedFilters, handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Experience Level</h4>
      <div className="flex flex-col gap-2">
        <InputField
          handleChange={handleChange}
          value="all"
          title="All"
          checked={selectedFilters.includes("all")}
        />
        {experienceLevels.map((level) => (
          <InputField
            key={level}
            handleChange={handleChange}
            value={level.toLowerCase()}
            title={level}
            checked={selectedFilters.includes(level.toLowerCase())}
          />
        ))}
      </div>
    </div>
  );
};

export default ExperienceLevel;
