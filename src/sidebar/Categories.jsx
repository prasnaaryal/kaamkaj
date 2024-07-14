import React from "react";
import InputField from "../components/InputFieldFilter";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "DevOps",
  "UI/UX Designer",
  "QA",
];

const Categories = ({ selectedFilters, handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Categories</h4>
      <div className="flex flex-col gap-2">
        <InputField
          handleChange={handleChange}
          value="all"
          title="All"
          checked={selectedFilters.includes("all")}
        />
        {categories.map((category) => (
          <InputField
            key={category}
            handleChange={handleChange}
            value={category.toLowerCase()}
            title={category}
            checked={selectedFilters.includes(category.toLowerCase())}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
