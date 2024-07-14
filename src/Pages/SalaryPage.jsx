import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const SalaryPage = () => {
  const [searchText, setSearchText] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/job/getalljobs")
      .then((res) => {
        setJobs(res.data);
        setFilteredJobs(res.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  const handleSearch = () => {
    const searchTerm = searchText.toLowerCase();
    const matchedJobs = jobs.filter(
      (job) => job.category && job.category.toLowerCase().includes(searchTerm)
    );

    const otherJobs = jobs.filter(
      (job) => job.category && !job.category.toLowerCase().includes(searchTerm)
    );

    setFilteredJobs([...matchedJobs, ...otherJobs]);
  };

  const jobCountsByCategory = filteredJobs.reduce((acc, job) => {
    if (job.category) {
      acc[job.category] = (acc[job.category] || 0) + 1;
    }
    return acc;
  }, {});

  const averageSalaryByCategory = filteredJobs.reduce((acc, job) => {
    if (job.category) {
      const minSalary = parseInt(job.minSalary);
      const maxSalary = parseInt(job.maxSalary);
      const avgSalary = (minSalary + maxSalary) / 2;

      if (!acc[job.category]) {
        acc[job.category] = { totalSalary: avgSalary, count: 1 };
      } else {
        acc[job.category].totalSalary += avgSalary;
        acc[job.category].count += 1;
      }
    }
    return acc;
  }, {});

  const handleFindJobClick = (category) => {
    navigate("/", { state: { category } });
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="flex w-full justify-center py-10">
        <h1 className="text-4xl text-blue-500 font-semibold">
          Estimate Salary
        </h1>
      </div>

      <div className="mt-5">
        <div className="search-box p-2 text-center mb-2">
          <input
            type="text"
            name="search"
            id="search"
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white font-semibold px-8 py-2 rounded-sm mb-4"
          >
            Search
          </button>
        </div>
      </div>

      {/* salary display card */}
      <div className="grid llg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center">
        {Object.keys(jobCountsByCategory).map((category, index) => (
          <div key={index} className="shadow border rounded-lg px-4 py-8">
            <h4 className="font-semibold text-xl">{category}</h4>
            <p className="my-2 font-medium text-black/40 text-sm">
              {jobCountsByCategory[category]} Jobs
            </p>
            <p className="my-2 font-medium text-black/60 text-base">
              Average Salary:{" "}
              {(
                averageSalaryByCategory[category].totalSalary /
                averageSalaryByCategory[category].count
              ).toFixed(2)}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleFindJobClick(category)}
                className="underline text-blue-600"
              >
                Find a job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalaryPage;
