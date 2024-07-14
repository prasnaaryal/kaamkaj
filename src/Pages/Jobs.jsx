import React from "react";
import Card from "../components/Card";

const Jobs = ({ result, handleCardClick }) => {
  return (
    <>
      <div>
        <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
      </div>
      <section>
        {result.map((job) => (
          <Card key={job._id} data={job} onClick={handleCardClick} />
        ))}
      </section>
    </>
  );
};

export default Jobs;
