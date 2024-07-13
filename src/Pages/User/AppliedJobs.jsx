import React, { useEffect, useState } from "react";
import { SiTicktick } from "react-icons/si";
import { BsWallet } from "react-icons/bs";
import axiosInstance from "../../config/axiosConfig";

const AppliedJobs = () => {
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
        const response = await axiosInstance.post(
          "/job/get-applied-job-by-user",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setJobs(response.data);
        setFilteredJobs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (searchText.length >= 3) {
      const filtered = jobs.filter(
        (job) =>
          job.applicantId &&
          job.applicantId?.title
            .toLowerCase()
            .includes(searchText.toLowerCase())
      );
      setFilteredJobs(filtered);
      setCurrentPage(1); // Reset to the first page after search
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchText, jobs]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const itemsOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(itemsOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`/job/delete/${id}`);
      if (response.data.acknowledged === true) {
        alert("Job Deleted Successfully");
        setJobs(jobs.filter((job) => job._id !== id));
        setFilteredJobs(filteredJobs.filter((job) => job._id !== id));
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
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
      <div className="flex items-start px-2">
        <div className="space-x-3 p-2 text-center">
          <input
            value={searchText}
            onChange={handleSearch}
            type="text"
            name="search"
            id="search"
            className="py-2 pl-3 border focus:outline-none mt-10 w-96"
          />
          <button
            className="bg-blue-500 text-white font-semibold px-8 py-2 rounded-sm mb-4"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mt-10">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead className="bg-[#D9D9D9] bg-opacity-50 h-16 font-semibold">
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-1 whitespace-nowrap font-semibold text-left">
                      NO
                    </th>
                    <th className="px-16 bg-blueGray-50 text-blueGray-500 align-middle text-center border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-1 whitespace-nowrap font-semibold">
                      Title
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-1 whitespace-nowrap font-semibold text-left"></th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-1 whitespace-nowrap font-semibold text-left">
                      Salary
                    </th>
                  </tr>
                </thead>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <p>Loading..</p>
                  </div>
                ) : currentJobs.length === 0 ? (
                  <div className="flex w-full items-center justify-center">
                    <p>No jobs found</p>
                  </div>
                ) : (
                  <tbody>
                    {currentJobs.map((job, index) => (
                      <tr key={index} className="border-b">
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-1 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 flex flex-col align-center border-l-0 border-r-1 whitespace-nowrap p-4">
                          <h1 className="flex justify-center text-xs font-semibold">
                            {job.applicantId?.title}
                          </h1>
                          <div className="flex items-center justify-center gap-2 text-[#5E6670] text-xs">
                            <p>{job.jobId?.employmentType}</p>
                            {"."}
                            <p>
                              {job.jobId?.postingDate &&
                                new Date(job.jobId.postingDate).toDateString()}
                            </p>
                          </div>
                        </td>
                        <td className="border-t-0 mt-2 px-4 align-middle border-l-0 border-r-1 text-xs whitespace-nowrap p-4"></td>
                        <td className="border-t-0 mt-2 px-4 align-middle border-l-0 border-r-1 text-xs whitespace-nowrap p-4 flex items-center">
                          <div className="flex text-[#5E6670]">
                            <BsWallet className="text-[#0A65CC] mr-2" />
                            Rs
                            {job.jobId?.minSalary ?? "200k"}-Rs
                            {job.jobId?.maxSalary ?? "550k"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
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

export default AppliedJobs;
