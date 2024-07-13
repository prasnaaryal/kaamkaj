import React from "react";
import { FaArrowsAlt } from "react-icons/fa";
import { FaBath, FaLocationDot } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";

const TopDetail = ({ job }) => {
  return (
    <div className="bg-white border border-gray-200 shadow-lg rounded-xl">
      <button
        className="rounded-full h-7 w-20 bg-green-500 bg-opacity-20 text-teal-500 font-xl m-4 px-2"
        size="lg"
      >
        {job.employmentType}
      </button>

      <div className="px-6 mb-4">
        <div className="font-bold text-xl mb-2">{job.jobTitle}</div>
        <p className="text-teal-400 mb-2">
          Rs{job.minSalary} - Rs{job.maxSalary}
        </p>
        <p className="text-indigo-300 text-base flex">
          <FaLocationDot className="text-indigo-200 mt-1" />
          {job.jobLocation}
        </p>
      </div>

      <div className="flex ml-5 gap-5 pb-4 pt-4">
        <div className="flex items-center justify-center w-6 h-6 bg-gray-200 rounded-full">
          <IoBed />
        </div>
        <p className="text-[#616E96] font-semibold text-sm">
          {job.experienceLevel}
        </p>
      </div>
    </div>
  );
};

export default TopDetail;
