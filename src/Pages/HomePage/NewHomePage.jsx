import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./components/Search";
import Info from "./components/Info";
import Jobs from "../Jobs";
import Newsletter from "../../components/Newsletter";
import Sidebar from "../../sidebar/Sidebar";
import Clients from "./components/Clients";
import LastBanner from "./components/LastBanner";
import FeaturedJobs from "./components/FeaturedJobs";
import Pagination from "../../components/Pagination";
import axiosInstance from "../../config/axiosConfig";

const NewHomePage = () => {
  const navigate = useNavigate();

  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    salary: [],
    date: [],
    employmentType: [],
    experienceLevel: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get("/job/getalljobs")
      .then((res) => {
        setJobs(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      });
  }, []);

  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleFilterChange = (category, value) => {
    setSelectedFilters((prevState) => {
      const isChecked = prevState[category].includes(value);
      if (value === "" && category === "salary") {
        return {
          ...prevState,
          [category]: isChecked ? [] : [value],
        };
      } else {
        return {
          ...prevState,
          [category]: isChecked
            ? prevState[category].filter((item) => item !== value)
            : [...prevState[category], value],
        };
      }
    });
  };

  const handleCategoryChange = (event) => {
    handleFilterChange("category", event.target.value);
  };

  const handleSalaryChange = (event) => {
    handleFilterChange("salary", event.target.value);
  };

  const handleDateChange = (event) => {
    handleFilterChange("date", event.target.value);
  };

  const handleEmploymentTypeChange = (event) => {
    handleFilterChange("employmentType", event.target.value);
  };

  const handleExperienceLevelChange = (event) => {
    handleFilterChange("experienceLevel", event.target.value);
  };

  const salaryFilter = (job, salary) => {
    if (salary === "") return true;
    const [min, max] = salary.split("-").map(Number);
    return parseInt(job.maxSalary) >= min && parseInt(job.maxSalary) <= max;
  };

  const filteredJobs = jobs.filter((job) => {
    const queryMatch = job.jobTitle.toLowerCase().includes(query.toLowerCase());
    const categoryMatch = selectedFilters.category.length
      ? selectedFilters.category.includes(job.category)
      : true;
    const salaryMatch = selectedFilters.salary.length
      ? selectedFilters.salary.includes("") ||
        selectedFilters.salary.some((salary) => salaryFilter(job, salary))
      : true;
    const dateMatch = selectedFilters.date.length
      ? selectedFilters.date.includes("") ||
        selectedFilters.date.some(
          (date) => new Date(job.postingDate) >= new Date(date)
        )
      : true;
    const employmentTypeMatch = selectedFilters.employmentType.length
      ? selectedFilters.employmentType.includes("all") ||
        selectedFilters.employmentType.includes(
          job.employmentType.toLowerCase()
        )
      : true;
    const experienceLevelMatch = selectedFilters.experienceLevel.length
      ? selectedFilters.experienceLevel.includes("all") ||
        selectedFilters.experienceLevel.includes(
          job.experienceLevel.toLowerCase()
        )
      : true;

    return (
      queryMatch &&
      categoryMatch &&
      salaryMatch &&
      dateMatch &&
      employmentTypeMatch &&
      experienceLevelMatch
    );
  });

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredJobs.length);
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredJobs.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCardClick = (id) => {
    navigate(`/job/${id}`);
  };

  const { startIndex, endIndex } = calculatePageRange();
  const paginatedJobs = filteredJobs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  return (
    <div>
      <Search query={query} handleInputChange={handleInputChange} />
      <Info />
      <FeaturedJobs />
      <div className="mt-10">
        <img src="images/Frame 1000004984.png" alt="" />
      </div>
      <div>
        <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
          <div className="bg-white p-4 rounded">
            <Sidebar
              selectedFilters={selectedFilters}
              handleCategoryChange={handleCategoryChange}
              handleSalaryChange={handleSalaryChange}
              handleDateChange={handleDateChange}
              handleEmploymentTypeChange={handleEmploymentTypeChange}
              handleExperienceLevelChange={handleExperienceLevelChange}
            />
          </div>
          <div className="col-span-2 bg-white p-4 rounded-sm">
            {isLoading ? (
              <p className="font-medium">Loading....</p>
            ) : paginatedJobs.length > 0 ? (
              <Jobs result={paginatedJobs} handleCardClick={handleCardClick} />
            ) : (
              <>
                <h3 className="text-lg font-bold mb-2">0 Jobs</h3>
                <p>No data found</p>
              </>
            )}
            {paginatedJobs.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            )}
          </div>
          <div className="bg-white p-4 rounded">
            <Newsletter />
          </div>
        </div>
      </div>
      <Clients />
      <LastBanner />
    </div>
  );
};

export default NewHomePage;
