import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { RxBookmarkFilled } from "react-icons/rx";
import axiosInstance from "../../config/axiosConfig";
import { BsWallet } from "react-icons/bs";
import { useToast } from "../../components/CustomToast";

const SavedJobs = () => {
  const { addToast } = useToast();

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

  const unsaveJob = async (jobId) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axiosInstance.post(
        "/job/favorite/unsave",
        { jobId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      addToast("Job unsaved successfully", "success");
      // Remove the job from the state
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      setFilteredJobs((prevFilteredJobs) =>
        prevFilteredJobs.filter((job) => job._id !== jobId)
      );
    } catch (error) {
      addToast("Error unsaving job:", "error");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
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
      <div className="space-y-12 mt-6">
        <h1 className="font-semibold text-2xl">Saved Jobs</h1>
        <div className="border-[1px] border-blue-500"></div>
      </div>
      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mt-16">
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
                        <RxBookmarkFilled
                          className="text-gray-500 cursor-pointer"
                          onClick={() => unsaveJob(job._id)}
                        />
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
