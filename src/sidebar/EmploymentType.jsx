import React from "react";
import InputField from "../components/InputFieldFilter";

const employmentTypes = ["Remote", "Hybrid", "On-Site"];

const EmploymentType = ({ selectedFilters, handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Employment Type</h4>
      <div className="flex flex-col gap-2">
        <InputField
          handleChange={handleChange}
          value="all"
          title="All"
          checked={selectedFilters.includes("all")}
        />
        {employmentTypes.map((type) => (
          <InputField
            key={type}
            handleChange={handleChange}
            value={type.toLowerCase()}
            title={type}
            checked={selectedFilters.includes(type.toLowerCase())}
          />
        ))}
      </div>
    </div>
  );
};

export default EmploymentType;
