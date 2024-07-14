import React, { useEffect, useState } from "react";
import { BsWallet } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import { TbEdit } from "react-icons/tb";
import { Link } from "react-router-dom";
import axiosInstance from "../config/axiosConfig";
import { useToast } from "../../src/components/CustomToast";
import Modal from "../../src/components/Modal";
import { GrDocumentPdf } from "react-icons/gr";

const MyJobs = () => {
  const { addToast } = useToast();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentApplicants, setCurrentApplicants] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const userResponse = await axiosInstance.get("/user/load-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const companyName = userResponse.data.user.fullName;

        const jobsResponse = await axiosInstance.get(
          `/job/company/${encodeURIComponent(companyName)}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const jobsData = jobsResponse.data.map((job) => {
          const isActive =
            new Date(job.postingDate) >=
            new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);
          return {
            ...job,
            status: isActive ? "Active" : "Inactive",
            applicantCount: job.applicants.length,
          };
        });

        setJobs(jobsData);
        setFilteredJobs(jobsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  const handleSearch = () => {
    if (searchText.length >= 3) {
      const filtered = jobs.filter(
        (job) =>
          job.jobTitle?.toLowerCase().includes(searchText.toLowerCase()) ||
          job.companyName?.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
    setCurrentPage(1); // Reset to the first page after search
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axiosInstance.delete(`/job/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        addToast("Job Deleted Successfully", "success");
        setJobs(jobs.filter((job) => job._id !== id));
        setFilteredJobs(filteredJobs.filter((job) => job._id !== id));
      }
    } catch (error) {
      addToast("Unable to delete the job", "error");
    }
  };

  const handleApplicantsClick = (applicants) => {
    setCurrentApplicants(applicants);
    setIsModalOpen(true);
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
            className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
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
      <div className="flex items-start px-2">
        <div className="space-x-3 p-2 text-center">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
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
        <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead className="bg-[#D9D9D9] bg-opacity-50 h-16 font-semibold">
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      NO
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 text-center border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Job
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Status
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Salary
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 text-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Applicants
                    </th>
                    <th className="px-8 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                {isLoading ? (
                  <tbody>
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        Loading..
                      </td>
                    </tr>
                  </tbody>
                ) : filteredJobs.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No jobs found.
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {currentJobs.map((job, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left text-blueGray-700">
                          {index + 1 + (currentPage - 1) * itemsPerPage}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 whitespace-nowrap p-4">
                          <p className="flex justify-center text-sm font-semibold">
                            {job.jobTitle || "N/A"}
                          </p>
                        </td>
                        <td className="border-t-0 mt-2 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                          <div className="flex space text-[#0ba02c]">
                            <SiTicktick className="text-[#0ba02c] mr-2" />
                            {job.status}
                          </div>
                        </td>
                        <td className="border-t-0 mt-2 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 flex items-center">
                          <div className="flex space text-[#5E6670]">
                            <BsWallet className="text-[#0A65CC] mr-2" />
                            Rs
                            {job.minSalary || "N/A"}-Rs
                            {job.maxSalary || "N/A"}
                          </div>
                        </td>
                        <td
                          className="border-t-0 mt-2 px-4 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 cursor-pointer"
                          onClick={() => handleApplicantsClick(job.applicants)}
                        >
                          <div className="mr-2 flex text-sm text-blue-500">
                            <FaUserFriends className="mr-2" />
                            {job.applicantCount || 0} Applicant
                          </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 space-x-6">
                          <button className="text-indigo-600 hover:underline">
                            <Link to={`/manage/edit-job/${job._id}`}>
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
        {filteredJobs.length > 10 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            changePage={changePage}
          />
        )}
      </section>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Applicants"
      >
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 text-left">
                No
              </th>
              <th className="py-2 px-4 border-b border-gray-200 text-left">
                Applicant
              </th>
              <th className="py-2 px-4 border-b border-gray-200">CV</th>
            </tr>
          </thead>
          <tbody>
            {currentApplicants.length > 0 ? (
              currentApplicants.map((applicant, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {applicant.fullName}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-center">
                    <a
                      href={applicant.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      <GrDocumentPdf className="w-6 h-6 inline-block" />
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  No applicants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Modal>
    </div>
  );
};

export default MyJobs;
