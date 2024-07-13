import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import axiosInstance from "../../../config/axiosConfig";

const FeaturedJobs = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/job/getalljobs")
      .then((res) => {
        const jobs = res.data;
        const selectedJobs = jobs.sort(() => 0.5 - Math.random()).slice(0, 6);
        setFeaturedJobs(selectedJobs);
      })
      .catch((error) => {
        console.error("Error fetching featured jobs:", error);
      });
  }, []);

  const handleJobClick = (jobId) => {
    window.open(`/job/${jobId}`, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8 relative mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Featured Jobs</h1>
      <div className="flex flex-wrap gap-8 justify-center relative z-10">
        {featuredJobs.map((job, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 w-full max-w-xs cursor-pointer"
            onClick={() => handleJobClick(job._id)}
          >
            <div className="flex">
              <img
                src={job.companyLogo || "/images/Icon1.png"}
                alt="Company Logo"
                className="w-12 h-12 mr-4"
              />
              <div>
                <h2 className="text-lg font-semibold">{job.jobTitle}</h2>
                <p className="text-gray-500">
                  {new Date(job.postingDate).toDateString()}
                </p>
                <p className="flex items-center text-gray-500">
                  <FaMapMarkerAlt className="mr-1" /> {job.jobLocation}
                </p>
                <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded">
                  {job.employmentType}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <img
        src="images/Group.png"
        alt="Illustration"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 opacity z-0"
        style={{ width: "100px", height: "auto" }}
      />
    </div>
  );
};

export default FeaturedJobs;
