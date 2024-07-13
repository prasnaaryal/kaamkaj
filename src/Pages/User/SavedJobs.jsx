import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { RxBookmarkFilled } from "react-icons/rx";
import axiosInstance from "../../config/axiosConfig";
import { BsWallet } from "react-icons/bs";

const SavedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axiosInstance.get("/job/favorite/getall", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(response.data);
        setFilteredJobs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const itemsOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(itemsOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    const filtered = jobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to the first page after search
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const Pagination = ({ totalPages, currentPage, changePage }) => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center space-x-2 mt-10 mb-4">
        {currentPage > 1 && (
          <button
            onClick={() => changePage(currentPage - 1)}
            className="text-blue-600 hover:underline text-sm"
          >
            &lt;
          </button>
        )}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => changePage(page)}
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            onClick={() => changePage(currentPage + 1)}
            className="text-blue-600 hover:underline text-sm"
          >
            &gt;
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-screen-3xl container mx-auto 2xl:px-24 px-4">
      <div className="my-jobs-container">
        <div className="search-box p-2 text-center mb-2">
          <input
            value={searchText}
            onChange={handleSearch}
            type="text"
            name="search"
            id="search"
            className="py-2 pl-3 border focus:outline-none lg:w-4/12 mt-20 w-8"
          />
          <button
            className="bg-blue-400 text-white font-semibold px-8 py-2 rounded-sm mb-4"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="block w-full overflow-x-auto">
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <p>Loading..</p>
                </div>
              ) : (
                <div className="p-4">
                  {currentJobs.length === 0 ? (
                    <div className="flex items-center justify-center">
                      <p>No jobs found</p>
                    </div>
                  ) : (
                    currentJobs.map((job, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 "
                      >
                        <div className="flex items-center">
                          <img
                            src={job.companyLogo || "/images/Icon1.png"}
                            alt="Company Logo"
                            className="w-10 h-10 mr-4"
                          />
                          <div>
                            <h1 className="text-lg font-semibold">
                              {job.jobTitle}
                              <span className="ml-2 px-2 py-1 text-sm text-blue-600 bg-blue-200 rounded">
                                {job.employmentType}
                              </span>
                            </h1>
                            <div className="flex items-center text-sm text-gray-500">
                              <IoLocationOutline className="mr-1" />
                              {job.jobLocation}
                              <span className="mx-2">|</span>
                              <BsWallet className="mr-1" />
                              Rs{job.minSalary}-Rs{job.maxSalary}
                              <span className="mx-2">|</span>
                              <CiCalendar className="mr-1" />
                              {new Date(job.postingDate).toDateString()}
                            </div>
                          </div>
                        </div>
                        <RxBookmarkFilled className="text-gray-500" />
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        {filteredJobs.length > itemsPerPage && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            changePage={changePage}
          />
        )}
      </section>
    </div>
  );
};

export default SavedJobs;
