import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
import TopDetail from "./components/TopDetail";
import Description from "./components/Description";
import Rightbar from "./components/Rightbar";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/job/${id}`)
      .then((res) => {
        setJob(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!job) {
    return <p>No job details found</p>;
  }

  return (
    <div>
      <div className="pl-16 pr-16">
        <img src="/images/image5.png" className="w-full h-[400px]" alt="" />
      </div>

      <div className="py-10 pl-16 pr-16 ">
        <div className="container grid grid-cols-12 gap-8">
          <div className="col-span-8 gap-10 ">
            <TopDetail job={job} />
            <Description job={job} />
          </div>

          <div className="col-span-4">
            <Rightbar job={job} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
