import React from "react";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";

const Card = ({ data, onClick }) => {
  const {
    companyName,
    jobTitle,
    jobLocation,
    companyLogo,
    minSalary,
    maxSalary,
    employmentType,
    postingDate,
    description,
  } = data;

  return (
    <section
      className="bg-white border border-gray-300 rounded-lg p-6 mb-6 cursor-pointer"
      onClick={() => onClick(data._id)}
    >
      <div className="flex gap-4 items-start">
        <img
          src={companyLogo}
          alt=""
          className="w-20 h-20 object-cover rounded-full"
        />
        <div className="flex-1">
          <h4 className="text-gray-700 text-sm font-semibold mb-1">
            {companyName}
          </h4>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{jobTitle}</h3>

          <div className="text-black text-sm flex flex-wrap gap-4 mb-2">
            <span className="flex items-center gap-1">
              <FiMapPin className="text-lg text-blue-500" />
              {jobLocation}
            </span>
            <span className="flex items-center gap-1">
              <FiClock className="text-lg text-blue-500" />
              {employmentType}
            </span>
            <span className="flex items-center gap-1">
              <FiDollarSign className="text-lg text-blue-500" />
              {minSalary}-{maxSalary}
            </span>
            <span className="flex items-center gap-1">
              <FiCalendar className="text-lg text-blue-500" />
              {new Date(postingDate).toLocaleDateString()}
            </span>
          </div>

          <p className="text-gray-700 text-base">{description}</p>
        </div>
      </div>
    </section>
  );
};

export default Card;
