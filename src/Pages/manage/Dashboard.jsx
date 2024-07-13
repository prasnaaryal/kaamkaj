import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";

const Dashboard = () => {
  const [appliedJobsCount, setAppliedJobsCount] = useState(0);
  const [savedJobsCount, setSavedJobsCount] = useState(0);
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobCounts = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const appliedJobsResponse = await axiosInstance.post(
          "/job/get-applied-job-by-user",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppliedJobsCount(appliedJobsResponse.data.length);

        const savedJobsResponse = await axiosInstance.get(
          "/job/favorite/getall",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSavedJobsCount(savedJobsResponse.data.length);
      } catch (error) {
        console.error("Error fetching job counts:", error);
      }
    };

    const checkProfileCompletion = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const userResponse = await axiosInstance.get("/user/load-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userResponse.data.user.cv) {
          setIsProfileIncomplete(true);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchJobCounts();
    checkProfileCompletion();
  }, []);

  const handleEditProfile = () => {
    navigate("/manage/edit-profile");
  };

  return (
    <div className="flex flex-row">
      <div className="p-4 flex flex-col gap-4 w-full">
        <h1 className="font-semibold text-2xl">Welcome back !!</h1>
        <div className="border-[1px] border-blue-500"></div>
        <div className="flex justify-between gap-3 w-full pb-6">
          <div className="w-80 shadow-md rounded-lg p-4 flex items-center bg-[#E7F0FA]">
            <div className="grid grid-cols-12 gap-2 w-full px-6">
              <div className="col-span-9 flex flex-col gap-2 items-center justify-center">
                <h2 className="font-semibold text-2xl">{appliedJobsCount}</h2>
                <p className="font-semibold text-xl text-gray-400">
                  Applied jobs
                </p>
              </div>
              <div className="col-span-3 flex items-center justify-center">
                <img className="w-16 h-14" src="/images/Icon (4).png" alt="" />
              </div>
            </div>
          </div>

          <div className=" w-80 shadow-md rounded-lg p-4 flex items-center bg-[#FFF6E6]">
            <div className="grid grid-cols-12 gap-2 w-full px-6">
              <div className="col-span-9 flex flex-col gap-2 items-center justify-center">
                <h2 className="font-semibold text-2xl">{savedJobsCount}</h2>
                <p className="font-semibold text-xl text-gray-400">
                  Saved Jobs
                </p>
              </div>
              <div className="col-span-3 flex items-center justify-center">
                <img className="w-16 h-14" src="/images/Icon (5).png" alt="" />
              </div>
            </div>
          </div>
        </div>
        {isProfileIncomplete && (
          <div className="shadow-md rounded-lg p-4 flex items-center bg-[#E05151] justify-between">
            <div className="flex items-center gap-6">
              <img src="/images/person2.png" alt="" />
              <div className="flex flex-col text-white">
                <p className="font-semibold">
                  Your profile editing is not completed.
                </p>
                <p className="text-sm">
                  Complete your profile editing & build your custom Resume
                </p>
              </div>
            </div>
            <button
              className="bg-white text-[#E05151] font-semibold px-8 py-2 rounded"
              onClick={handleEditProfile}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
