import React, { useEffect, useState } from "react";
import { IoArrowRedo } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../config/axiosConfig";
import { useToast } from "../../../components/CustomToast";
import Modal from "../../../components/Modal";
import { GrDocumentVerified } from "react-icons/gr";

const Rightbar = ({ job }) => {
  const { addToast } = useToast();
  const [featuredCompanies, setFeaturedCompanies] = useState([]);
  const [role, setRole] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [isApplyNow, setIsApplyNow] = useState(false);
  const [isSaveJob, setIsSaveJob] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setRole(userRole);

    axiosInstance
      .get("/job/getalljobs")
      .then((res) => {
        const companies = res.data;
        const selectedCompanies = companies
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
        setFeaturedCompanies(selectedCompanies);
      })
      .catch((error) => {
        console.error("Error fetching featured companies:", error);
      });
  }, []);

  const fetchUserData = async () => {
    const token = localStorage.getItem("accessToken");
    const userResponse = await axiosInstance.get("/user/load-user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUserData(userResponse.data.user);
    return userResponse.data.user;
  };

  const handleApplyClick = async (companyId) => {
    if (role === "company") {
      addToast("Only applicants can apply for jobs", "error");
      return;
    }
    const user = await fetchUserData();
    if (!user.cv) {
      addToast("Complete your profile to apply for a job", "error");
      return;
    }
    setSelectedCompanyId(companyId);
    setShowPopup(true);
    setIsApplyNow(false);
    setIsSaveJob(false);
  };

  const handleApplyNowClick = async () => {
    if (role === "company") {
      addToast("Only applicants can apply for jobs", "error");
      return;
    }
    const user = await fetchUserData();
    if (!user.cv) {
      addToast("Complete your profile to apply for a job", "error");
      return;
    }
    setSelectedCompanyId(null);
    setShowPopup(true);
    setIsApplyNow(true);
    setIsSaveJob(false);
  };

  const handleSaveJobClick = async () => {
    if (role === "company") {
      addToast("Only applicants can save jobs", "error");
      return;
    }
    const user = await fetchUserData();
    if (!user.cv) {
      addToast("Complete your profile to save a job", "error");
      return;
    }
    setShowPopup(true);
    setIsApplyNow(false);
    setIsSaveJob(true);
  };

  const handleConfirmAction = async (confirm) => {
    if (confirm && role === "applicant") {
      if (isApplyNow || selectedCompanyId) {
        try {
          const token = localStorage.getItem("accessToken");
          const applyPayload = isApplyNow
            ? { jobId: job._id }
            : { jobId: job._id, companyId: selectedCompanyId };

          await axiosInstance.post("/job/apply", applyPayload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          addToast("Applied successfully", "success");

          const user = await fetchUserData();
          setShowPopup(false);
          setShowApplyForm(true);
        } catch (error) {
          console.error("Error applying:", error);
          addToast("Complete your profile before applying for a job!", "error");
        }
      } else if (isSaveJob) {
        try {
          const token = localStorage.getItem("accessToken");
          const savePayload = { jobId: job._id };

          await axiosInstance.post("/job/favorite/save", savePayload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          addToast("Job saved successfully", "success");
        } catch (error) {
          console.error("Error saving job:", error);
          addToast("Error saving job", "error");
        }
        setShowPopup(false);
      }
    } else {
      setShowPopup(false);
    }
  };

  const handleEditProfile = () => {
    navigate("/manage/edit-profile");
  };

  return (
    <div>
      <Modal
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        className="max-w-lg"
      >
        <div className="flex flex-col items-center justify-center mb-4 gap-4">
          <p className="font-semibold text-2xl">
            {isSaveJob ? "Save this Job?" : "Apply for the Job?"}
          </p>
          <img src={isSaveJob ? "/images/save.png" : "/images/apply.png"} />
        </div>
        <div className="flex justify-around">
          <button
            className="bg-blue-500 text-white py-2 px-8 rounded"
            onClick={() => handleConfirmAction(true)}
          >
            Yes
          </button>
          <button
            className="bg-white border border-blue-500 text-blue-500 py-2 px-8 rounded"
            onClick={() => handleConfirmAction(false)}
          >
            No
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showApplyForm}
        onClose={() => setShowApplyForm(false)}
        className="max-w-lg"
      >
        <div className="flex flex-col p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Information</h2>
            <button
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={handleEditProfile}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536M14.5 2.5a2.121 2.121 0 113 3L7.5 15.5 4 16l.5-3.5L14.5 2.5z"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                value={userData.fullName}
                disabled
                className="w-full p-2 mt-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                value={userData.title}
                disabled
                className="w-full p-2 mt-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Personal Website</label>
              <input
                type="text"
                value={userData.personalWebsite}
                disabled
                className="w-full p-2 mt-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Your CV</label>
              <div className="flex items-center">
                <GrDocumentVerified className="w-6 h-6 text-blue-600" />
                <a
                  href={userData.cv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 underline"
                >
                  View CV
                </a>
              </div>
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
              onClick={() => {
                setShowApplyForm(false);
                handleConfirmAction(true);
              }}
            >
              Apply
            </button>
          </div>
        </div>
      </Modal>

      <div className="bg-white shadow-lg rounded-xl h-44 w-[350px]">
        <div className="flex p-6 gap-10">
          <button
            size="lg"
            className="flex items-center justify-center gap-2 rounded-lg w-36 h-12 bg-[#52853C] bg-opacity-20 border-[#3B82F6] border-2"
          >
            <IoArrowRedo className="text-[#3B82F6]" />
            <span>Share</span>
          </button>
          <button
            size="lg"
            className="flex items-center justify-center gap-2 rounded-lg w-36 h-12 bg-orange-200 bg-opacity-30 border-orange-400 border-2"
            onClick={handleSaveJobClick}
          >
            <MdFavoriteBorder className="text-orange-500" />
            <span>Save</span>
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            size="lg"
            className="rounded-lg w-72 h-12 bg-[#3B82F6] bg-opacity-20 border-[#3B82F6] border-2"
            onClick={handleApplyNowClick}
          >
            Apply Now
          </button>
        </div>
      </div>

      <div className="bg-white mt-10 shadow-lg rounded-xl w-[350px] pb-4">
        <h1 className="p-6 font-semibold text-lg">Featured Companies</h1>
        <div className="border-b-2"></div>

        {featuredCompanies.map((company, index) => (
          <div key={index} className="flex m-6">
            <img
              src={company.companyLogo || "/images/Icon1.png"}
              className="w-18 h-10"
              alt="profile img"
            />
            <div className="px-6">
              <h1 className="text-lg font-semibold">{company.companyName}</h1>
              <p className="text-slate-500 font-sm">
                {new Date(company.postingDate).toDateString()}
              </p>
              <p className="flex gap-2 mb-6">
                <FaLocationDot className="text-teal-400 mt-1" />
                {company.jobLocation}
              </p>
              <button
                className="rounded-full w-14 h-7 bg-teal-200 bg-opacity-30 text-teal-500"
                onClick={() => handleApplyClick(company._id)}
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rightbar;
