import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Card from "../components/Card";
import Jobs from "./Jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../components/Newsletter";
import axiosInstance from "../config/axiosConfig"; 

const Home = () => {
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
    axiosInstance
      .get("/job/getalljobs")
      .then((res) => {
        setJobs(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jobs:", error);
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

  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

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
            experienceLevel.toLowerCase() === selected.toLowerCase() ||
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

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
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

          <div className="bg-white p-4 rounded">
            <Newsletter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
