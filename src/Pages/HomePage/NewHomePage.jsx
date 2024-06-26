import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Info from "./components/Info";
import Card from "../../components/Card";
import Jobs from "../Jobs";
import Newsletter from "../../components/Newsletter";
import Sidebar from "../../sidebar/Sidebar";
import Clients from "./components/Clients";
import LastBanner from "./components/LastBanner";
import FeaturedJobs from "./components/FeaturedJobs";
import Pagination from "../../components/Pagination";


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
    fetch("http://localhost:9000/api/job/getalljobs")
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

  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    console.log({ event });
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredItems.length);
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
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

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    if (query) {
      filteredJobs = filteredItems;
    }

    if (selected) {
      filteredJobs = filteredJobs.filter(
        ({
          category,
          jobLocation,
          maxSalary,
          experienceLevel,
          employmentType,
          postingDate,
        }) => {
          const postingDateTime = new Date(postingDate).getTime();
          const selectedTime = new Date(selected).getTime();
          return (
            postingDateTime >= selectedTime ||
            jobLocation.toLowerCase() === selected.toLowerCase() ||
            parseInt(maxSalary) <= parseInt(selected) ||
            experienceLevel.toLowerCase() === selected.toLowerCase() ||
            category.toLowerCase() === selected.toLowerCase() ||
            employmentType.toLowerCase() === selected.toLowerCase()
          );
        }
      );
      console.log({ selected });
    }

    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);
    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(jobs, selectedCategory, query);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div>
      <Search />
      <Info />
      <FeaturedJobs />
      <div className="mt-10">
        <img src="images/Frame 1000004984.png" alt="" />
      </div>
      <div>
        <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
          <div className="bg-white p-4 rounded">
            <Sidebar handleChange={handleChange} handleClick={handleClick} />
          </div>
          <div className="col-span-2 bg-white p-4 rounded-sm">
            {isLoading ? (
              <p className="font-medium">Loading....</p>
            ) : result.length > 0 ? (
              <Jobs result={result} />
            ) : (
              <>
                <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
                <p>No data found</p>
              </>
            )}
            {result.length > 0 && (
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
      <LastBanner />
    </div>
  );
};

export default NewHomePage;
