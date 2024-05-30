import React, { useEffect, useState } from 'react'
import Sidebar from '../manage/Sidebar';
import { SiTicktick } from 'react-icons/si';
import { BsWallet } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { TbEdit } from 'react-icons/tb';
import { RiDeleteBinLine } from 'react-icons/ri';

const AppliedJobs = () => {

    const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect (() => {
    setIsLoading(true);
    fetch(`http://localhost:3000/myJobs/prasna123@gmail.com`)
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, [searchText]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const itemsOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(itemsOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const handleSearch = () => {
    const filter = jobs.filter(
      (job) =>
        job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    setJobs(filter);
    setIsLoading(false);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/job/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged === true) {
          alert("Job Deleted Successfully");
          setJobs(jobs.filter((job) => job._id !== id));
        }
      });
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
      <div className="my-jobs-container ">
        <div className="search-box p-2 text-center mb-2">
          <input
            onChange={(e) => setSearchText(e.target.value)}
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
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead className="bg-[#D9D9D9] bg-opacity-50 h-16 font-semibold">
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      NO
                    </th>
                    <th className="px-16 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Title
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Status
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Salary
                    </th>
                   
                    
                  </tr>
                </thead>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <p>Loading..</p>
                  </div>
                ) : (
                  <tbody>
                    {currentJobs.map((job, index) => (
                      <tr key={index}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {index + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
                         <h1 className="flex justify-center text-xs font-semibold">{job.jobTitle}</h1> 
                         <div className="flex gap-4  text-[#5E6670] text-xs">
                         <p className="">{job.employmentType}</p>
                          <p className="">{job.postingDate}</p>

                         </div>

                         
                        </td>
                        <td className="border-t-0 mt-2 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          <div className="flex space text-[#0ba02c]">
                            <SiTicktick  className="text-[#0ba02c] mr-2" />
                            Active
                          </div>
                        </td>
                        <td className="border-t-0 mt-2 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 flex items-center">
                          <div className="flex space text-[#5E6670]">
                            <BsWallet className="text-[#0A65CC] mr-2" />$
                            {job.minPrice}-${job.maxPrice}
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
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          changePage={changePage}
        />
      </section>
    </div>
  );
  
    };
    


export default AppliedJobs