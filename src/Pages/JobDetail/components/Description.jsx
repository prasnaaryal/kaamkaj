import React from "react";

const Description = ({ job }) => {
  const responsibilitiesArray = job.responsibilities.split(";");
  const requirementsArray = job.requirements.split(";");

  return (
    <div>
      <div className="bg-white mt-8 flex justify-start items-center border border-gray-200 shadow-lg rounded-xl">
        <div className="p-6 flex flex-col mb-4">
          <h1 className="font-bold border-b-4 w-12 border-[#3B82F6] pt-4 ">
            Description
          </h1>
          <p className="mt-6">{job.description}</p>
        </div>
      </div>

      <div className="bg-white mt-8 flex border border-gray-200  shadow-lg rounded-xl">
        <div className="p-6 flex flex-col mb-4">
          <h1 className="font-bold border-b-4 w-12 border-[#3B82F6] pt-4 ">
            Responsibilities
          </h1>
          <ul className="mt-6 list-disc list-inside">
            {responsibilitiesArray.map((responsibility, index) => (
              <li key={index}>{responsibility.trim()}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white mt-8 flex border border-gray-200  shadow-lg rounded-xl">
        <div className="p-6 flex flex-col mb-4">
          <h1 className="font-bold border-b-4 w-12 border-[#3B82F6] pt-4 ">
            Requirements
          </h1>
          <ul className="mt-6 list-disc list-inside">
            {requirementsArray.map((requirement, index) => (
              <li key={index}>{requirement.trim()}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Description;
