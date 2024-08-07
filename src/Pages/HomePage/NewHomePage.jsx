import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const jobsSectionRef = useRef(null);
  const searchSectionRef = useRef(null);

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
  const [filteredJobs, setFilteredJobs] = useState([]);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get("/job/getalljobs")
      .then((res) => {
        setJobs(res.data);
        setFilteredJobs(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (location.state && location.state.category) {
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        category: [location.state.category.toLowerCase()],
      }));
      filterJobsByCategory(location.state.category.toLowerCase());
      jobsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state, jobs]);

  const filterJobsByCategory = (category) => {
    const filtered = jobs.filter(
      (job) => job.category && job.category.toLowerCase() === category
    );
    setFilteredJobs(filtered);
  };

  const [query, setQuery] = useState("");
  const [locationText, setLocationText] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocationText(event.target.value);
  };

  const handleSearch = (searchQuery, searchLocation) => {
    setQuery(searchQuery);
    setLocationText(searchLocation);

    const filtered = jobs.filter(
      (job) =>
        job.jobTitle &&
        job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (searchLocation === "" ||
          (job.jobLocation &&
            job.jobLocation
              .toLowerCase()
              .includes(searchLocation.toLowerCase())))
    );

    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to the first page after search

    // Smooth scroll to jobs section
    jobsSectionRef.current.scrollIntoView({ behavior: "smooth" });
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
        if (value === "all") {
          return {
            ...prevState,
            [category]: isChecked ? [] : [value],
          };
        } else {
          return {
            ...prevState,
            [category]: isChecked
              ? prevState[category].filter((item) => item !== value)
              : [
                  ...prevState[category].filter((item) => item !== "all"),
                  value,
                ],
          };
        }
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

  const filteredJobsByFilters = filteredJobs.filter((job) => {
    const categoryMatch = selectedFilters.category.length
      ? selectedFilters.category.includes("all") ||
        selectedFilters.category.includes(
          job.category ? job.category.toLowerCase() : ""
        )
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
          job.employmentType ? job.employmentType.toLowerCase() : ""
        )
      : true;
    const experienceLevelMatch = selectedFilters.experienceLevel.length
      ? selectedFilters.experienceLevel.includes("all") ||
        selectedFilters.experienceLevel.includes(
          job.experienceLevel ? job.experienceLevel.toLowerCase() : ""
        )
      : true;

    return (
      categoryMatch &&
      salaryMatch &&
      dateMatch &&
      employmentTypeMatch &&
      experienceLevelMatch
    );
  });

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffle the filtered jobs
  const shuffledJobs = shuffleArray([...filteredJobsByFilters]);

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, shuffledJobs.length);
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(shuffledJobs.length / itemsPerPage)) {
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
  const paginatedJobs = shuffledJobs.slice(startIndex, endIndex);
  const totalPages = Math.ceil(shuffledJobs.length / itemsPerPage);

  const handleLastBannerSearchClick = () => {
    searchSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div ref={searchSectionRef}>
        <Search
          query={query}
          location={locationText}
          handleInputChange={handleInputChange}
          handleLocationChange={handleLocationChange}
          handleSearch={handleSearch}
        />
      </div>
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
          <div
            className="col-span-2 bg-white p-4 rounded-sm"
            ref={jobsSectionRef}
          >
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
      <LastBanner onSearchClick={handleLastBannerSearchClick} />
    </div>
  );
};

export default NewHomePage;
