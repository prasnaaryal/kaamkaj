import React from "react";
import Salary from "./Salary";
import JobPostingData from "./JobPostingData";
import EmploymentType from "./EmploymentType";
import ExperienceLevel from "./ExperienceLevel";
import Categories from "./Categories";

const Sidebar = ({
  selectedFilters,
  handleCategoryChange,
  handleSalaryChange,
  handleDateChange,
  handleEmploymentTypeChange,
  handleExperienceLevelChange,
}) => {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-bold mb-2">Filters</h3>
      <Categories
        selectedFilters={selectedFilters.category}
        handleChange={handleCategoryChange}
      />
      <Salary
        selectedFilters={selectedFilters.salary}
        handleChange={handleSalaryChange}
      />
      <JobPostingData
        selectedFilters={selectedFilters.date}
        handleChange={handleDateChange}
      />
      <EmploymentType
        selectedFilters={selectedFilters.employmentType}
        handleChange={handleEmploymentTypeChange}
      />
      <ExperienceLevel
        selectedFilters={selectedFilters.experienceLevel}
        handleChange={handleExperienceLevelChange}
      />
    </div>
  );
};

export default Sidebar;
