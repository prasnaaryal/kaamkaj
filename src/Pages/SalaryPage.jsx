import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import axiosInstance from "../config/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const SalaryPage = () => {
  const [searchText, setSearchText] = useState("");
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/job/getalljobs")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
      });
  }, []);

  const handleSearch = () => {
    const filter = jobs.filter((job) =>
      job.category.toLowerCase().includes(searchText.toLowerCase())
    );
    setJobs(filter);
  };

  const jobCountsByCategory = jobs.reduce((acc, job) => {
    acc[job.category] = (acc[job.category] || 0) + 1;
    return acc;
  }, {});

  const handleFindJobClick = (category) => {
    navigate("/", { state: { category } });
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Estimate Salary"} path={"Salary"} />

      <div className="mt-5">
        <div className="search-box p-2 text-center mb-2">
          <input
            type="text"
            name="search"
            id="search"
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-200 text-white font-semibold px-8 py-2 rounded-sm mb-4"
          >
            Search
          </button>
        </div>
      </div>

      {/* salary display card */}
      <div className="grid llg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center">
        {Object.keys(jobCountsByCategory).map((category, index) => (
          <div key={index} className="shadow border border-black-500 px-4 py-8">
            <h4 className="font-semibold text-xl">{category}</h4>
            <p className="my-2 font-medium text-black-300 text-lg">
              {jobCountsByCategory[category]} Jobs
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
