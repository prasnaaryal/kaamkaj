import React, { useEffect, useState } from "react";
import { BsWallet } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";

const MyJobs = () => {
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
          "/job/getallappliedjobs",
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
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (searchText.length >= 3) {
      handleSearch();
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchText]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handleSearch = () => {
    const filtered = jobs.filter(
      (job) =>
        job.job?.jobTitle?.toLowerCase().includes(searchText.toLowerCase()) ||
        job.job?.companyName?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to the first page after search
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
    <div className="w-[75vw] mx-auto">
      <div className="">
        <div className="search-box p-2 text-center mb-2">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            name="search"
            id="search"
            className="py-2 pl-3 border border-blue-500 focus:outline-none mt-20 w-[500px]"
            placeholder="Search by job title or company"
          />
        </div>
      </div>

      <section className="py-1 bg-blueGray-50">
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead className="bg-[#D9D9D9] bg-opacity-50 h-16 font-semibold">
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      NO
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Title
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Company Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Employment Type
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Status
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Salary
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Applicants
                    </th>
                    <th className="px-8 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <p>Loading..</p>
                  </div>
                ) : filteredJobs.length === 0 ? (
                  <div className="flex items-center justify-center">
                    <p>No jobs found.</p>
                  </div>
                ) : (
                  <tbody>
                    {currentJobs.map((job, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {index + 1 + (currentPage - 1) * itemsPerPage}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                          <p className="flex justify-center text-xs font-semibold">
                            {job.job?.jobTitle || "N/A"}
                          </p>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                          <p className="flex justify-center text-xs font-semibold">
                            {job.job?.companyName || "N/A"}
                          </p>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                          <p className="flex justify-center text-xs font-semibold">
                            {job.job?.employmentType || "N/A"}
                          </p>
                        </td>
                        <td className="border-t-0 mt-2 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="flex space text-[#0ba02c]">
                            <SiTicktick className="text-[#0ba02c] mr-2" />
                            {job.status}
                          </div>
                        </td>
                        <td className="border-t-0 mt-2 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex items-center">
                          <div className="flex space text-[#5E6670]">
                            <BsWallet className="text-[#0A65CC] mr-2" />
                            Rs
                            {job.job?.minSalary || "N/A"}-Rs
                            {job.job?.maxSalary || "N/A"}
                          </div>
                        </td>
                        <td className="border-t-0 mt-2 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="mr-2 flex text-xs text-[#0A65CC]">
                            <FaUserFriends className="text-[#5E6670] mr-2" />
                            {job.job?.experienceLevel || "N/A"}
                          </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-6">
                          <button className="text-indigo-600 hover:underline">
                            <Link to={`/edit-job/${job.job?._id}`}>
                              <TbEdit className="text-[#0ba02c] w-4 h-4" />
                            </Link>
                          </button>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="py-2 px-2"
                          >
                            <RiDeleteBinLine className="text-red-600 w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          changePage={changePage}
        />
      </section>
    </div>
  );
};

export default MyJobs;
