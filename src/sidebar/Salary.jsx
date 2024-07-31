import React from "react";
import InputField from "../components/InputFieldFilter";

const Salary = ({ selectedFilters, handleChange }) => {
  const options = [
    { value: "", title: "All" },
    { value: "0-30000", title: "<30k" },
    { value: "30001-50000", title: "30k-50k" },
    { value: "50001-80000", title: "50k-80k" },
    { value: "80001-200000000", title: "80k+" },
  ];

  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Salary</h4>
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

export default Salary;
