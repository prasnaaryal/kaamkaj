import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosConfig";
import { IoIosPeople } from "react-icons/io";

const Dashboard = () => {
  const [postedJobsCount, setPostedJobsCount] = useState(0);
  const [totalApplicantsCount, setTotalApplicantsCount] = useState(0);
  const [appliedJobsCount, setAppliedJobsCount] = useState(0);
  const [savedJobsCount, setSavedJobsCount] = useState(0);
  const [isProfileIncomplete, setIsProfileIncomplete] = useState(false);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const userResponse = await axiosInstance.get("/user/load-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = userResponse.data.user;
        setUserRole(user.role);

        if (user.role === "company") {
          const companyName = user.fullName;
          const jobsResponse = await axiosInstance.get(
            `/job/company/${encodeURIComponent(companyName)}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const jobs = jobsResponse.data;
          setPostedJobsCount(jobs.length);
          const applicantsCount = jobs.reduce(
            (acc, job) => acc + job.applicants.length,
            0
          );
          setTotalApplicantsCount(applicantsCount);

          if (!user.aboutUs) {
            setIsProfileIncomplete(true);
          }
        } else if (user.role === "applicant") {
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

          if (!user.cv) {
            setIsProfileIncomplete(true);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    navigate("/manage/edit-profile");
  };

  return (
    <div className="flex flex-row">
      <div className="p-4 flex flex-col gap-4 w-full">
        <div className="space-y-10 mt-4">
          <h1 className="font-semibold text-2xl">Welcome Back!!</h1>
          <div className="border-[1px] border-blue-500"></div>
        </div>
        {userRole === "company" && (
          <div className="flex justify-between gap-3 w-full pb-6">
            <div className="w-80 shadow-md rounded-lg p-4 flex items-center bg-[#E7F0FA]">
              <div className="grid grid-cols-12 gap-2 w-full px-6">
                <div className="col-span-9 flex flex-col gap-2 items-center justify-center">
                  <h2 className="font-semibold text-2xl">{postedJobsCount}</h2>
                  <p className="font-semibold text-xl text-gray-400">
                    Posted Jobs
                  </p>
                </div>
                <div className="col-span-3 flex items-center justify-center">
                  <img
                    className="w-16 h-14"
                    src="/images/Icon (4).png"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="w-80 shadow-md rounded-lg p-4 flex items-center bg-[#FFF6E6]">
              <div className="grid grid-cols-12 gap-2 w-full px-6">
                <div className="col-span-9 flex flex-col gap-2 items-center justify-center">
                  <h2 className="font-semibold text-2xl">
                    {totalApplicantsCount}
                  </h2>
                  <p className="font-semibold text-xl text-gray-400">
                    Total Applicants
                  </p>
                </div>
                <div className="col-span-3 h-16 rounded-md flex bg-white items-center justify-center">
                  <IoIosPeople className="w-8 h-20" />
                </div>
              </div>
            </div>
          </div>
        )}
        {userRole === "applicant" && (
          <div className="flex justify-between gap-3 w-full pb-6">
            <div className="w-80 shadow-md rounded-lg p-4 flex items-center bg-[#E7F0FA]">
              <div className="grid grid-cols-12 gap-2 w-full px-6">
                <div className="col-span-9 flex flex-col gap-2 items-center justify-center">
                  <h2 className="font-semibold text-2xl">{appliedJobsCount}</h2>
                  <p className="font-semibold text-xl text-gray-400">
                    Applied Jobs
                  </p>
                </div>
                <div className="col-span-3 flex items-center justify-center">
                  <img
                    className="w-16 h-14"
                    src="/images/Icon (4).png"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="w-80 shadow-md rounded-lg p-4 flex items-center bg-[#FFF6E6]">
              <div className="grid grid-cols-12 gap-2 w-full px-6">
                <div className="col-span-9 flex flex-col gap-2 items-center justify-center">
                  <h2 className="font-semibold text-2xl">{savedJobsCount}</h2>
                  <p className="font-semibold text-xl text-gray-400">
                    Saved Jobs
                  </p>
                </div>
                <div className="col-span-3 flex items-center justify-center">
                  <img
                    className="w-16 h-14"
                    src="/images/Icon (5).png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        )}
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
