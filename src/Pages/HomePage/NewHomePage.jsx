import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Info from './components/Info'
import Card from '../../components/Card';
import Jobs from '../Jobs';
import { FaLocationDot } from 'react-icons/fa6';
import Newsletter from '../../components/Newsletter';
import Sidebar from '../../sidebar/Sidebar';

const NewHomePage = () => {

  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/all-jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  const [query, setQuery] = useState("");
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  //filter jobs by title
  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );
  // console.log(filteredItems)

  //Radiobuttons
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log({ event });
  };

  //buttin based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Calculate the index range for pagination
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredItems.length);
    return { startIndex, endIndex };
  };

  //function for the next page
  // Function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  //function for the prev page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //main function
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    //filtering input items
    if (query) {
      filteredJobs = filteredItems;
    }

    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) => {
          const postingDateTime = new Date(postingDate).getTime();
          const selectedTime = new Date(selected).getTime();
          return (
            postingDateTime >= selectedTime ||
            jobLocation.toLowerCase() === selected.toLowerCase() ||
            parseInt(maxPrice) <= parseInt(selected) ||
            salaryType.toLowerCase() === selected.toLowerCase() ||
            experienceLevel.toLowerCase() === selected.toLowerCase() 
||
            employmentType.toLowerCase() === selected.toLowerCase() 
          );
        }
      );
      console.log({ selected });
    }

    //slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

  return (

    <div>
        <Search/>
        <Info/>
        <div className="bg-white mt-10 mb-10  shadow-lg rounded-xl h-[300px] w-[350px]">
        <h1 className="p-6 font-semibold text-lg">Featured Property</h1>
        <div className="border-b-2"></div>

        <div className="flex m-6">
          <img
            src="images\Icon1.png"
            className="w-18 h-10"
            alt="profile img"
          />
          <div className="p-6">
            <h1 className="text-lg font-semibold mt-4">Westchester Village</h1>
            <p className="text-slate-500 font-sm">July 24, 2022</p>
            <p className="flex gap-2 mb-6">
              <FaLocationDot className="text-teal-400 mt-1" />
              3599 Huntz Lane
            </p>
            <button className="rounded-full w-14 h-7 bg-teal-200 bg-opacity-30 text-teal-500">
              Buy
            </button>
          </div>
        </div>
      </div>
      <div className=''>
        <img src="images\Process.png" alt=""/>
      </div>
      <div>
        <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
          {/* left side */}
          <div className="bg-white p-4 rounded">
            <Sidebar handleChange={handleChange} handleClick={handleClick} />
          </div>

          {/* job cards */}
          <div className="col-span-2 bg-white p-4 rounded-sm">
            {isLoading ? (
              <p className="font-medium">Loading....</p>
            ) : result.length > 0 ? (
              <Jobs result={result} />
            ) : (
              <>
                <h3 className="text-lg font-bold mb-2">{result.length}Jobs</h3>
                <p>No data found</p>
              </>
            )}

            {/* pagination */}

            {result.length > 0 ? (
              <div className="flex justify-center mt-4  space-x-8">
                <button onClick={prevPage}>Previous</button>
                <span className="mx-2">
                  Page {currentPage} of{" "}
                  {Math.ceil(filteredItems.length / itemsPerPage)}
                </span>
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredItems.length / itemsPerPage)
                  }
                >
                  Next
                </button>
              </div>
            ) : (
              ""
            )}
          </div>

          {/* right side */}

          <div className="bg-white p-4 rounded">
            <Newsletter />
          </div>
        </div>
      </div>


        


    </div>
  )
}

export default NewHomePage