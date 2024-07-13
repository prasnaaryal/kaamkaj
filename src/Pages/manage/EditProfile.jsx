import React, { useEffect, useState } from "react";
import { PiLinkSimpleLight } from "react-icons/pi";
import UploadFile from "../../components/UploadFile";
import UploadPDF from "../../components/UploadPDF";
import axiosInstance from "../../config/axiosConfig";
import { useToast } from "../../components/CustomToast";

const EditProfile = () => {
  const { addToast } = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [role, setRole] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    fullName: "",
    companyWebsite: "",
    companyAddress: "",
    aboutUs: "",
    title: "",
    cv: "",
    image: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const userResponse = await axiosInstance.get("/user/load-user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const user = userResponse.data.user;
          setUserData({
            id: user._id,
            fullName: user.fullName,
            companyWebsite: user.companyWebsite || "",
            companyAddress: user.companyAddress || "",
            aboutUs: user.aboutUs || "",
            title: user.title || "",
            cv: user.cv || "",
            image: user.image,
          });
          setRole(user.role);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleFileSelected = (file) => {
    setSelectedFile(file);
  };

  const handleImageSelected = (image) => {
    setSelectedImage(image);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const formData = new FormData();

        if (role === "company") {
          formData.append("fullName", userData.fullName);
          formData.append("companyWebsite", userData.companyWebsite);
          formData.append("companyAddress", userData.companyAddress);
          formData.append("aboutUs", userData.aboutUs);
          if (selectedImage) {
            formData.append("image", selectedImage);
          }

          const response = await axiosInstance.put(
            `/user/update-company/${userData.id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Profile updated successfully:", response.data);
          addToast("Profile updated successfully", "success");
        } else if (role === "applicant") {
          formData.append("fullName", userData.fullName);
          formData.append("title", userData.title);
          formData.append("personalWebsite", userData.personalWebsite);
          if (selectedFile) {
            formData.append("cv", selectedFile);
          }
          if (selectedImage) {
            formData.append("image", selectedImage);
          }

          const response = await axiosInstance.put(
            `/user/update-profile/${userData.id}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Profile updated successfully:", response.data);
          addToast("Profile updated successfully", "success");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        addToast("Please fill all fields!", "error");
      }
    }
  };

  return (
    <div className="grid grid-cols-8 gap-4 px-6 py-8">
      {role === "company" ? (
        <>
          <div className="col-span-2 flex justify-center">
            <UploadFile
              onFileSelected={handleImageSelected}
              initialFile={
                userData.image
                  ? { url: userData.image, name: "Company Image" }
                  : null
              }
            />
          </div>
          <div className="col-span-6">
            <form className="space-y-6">
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="mb-2 text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  className="border rounded py-2 px-3 font-normal h-10 w-full placeholder-[#9199A3]"
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={userData.fullName}
                  disabled
                />
                <p className="text-xs text-red-500">Names cannot be edited*</p>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="companyAddress"
                  className="mb-2 text-sm font-medium text-gray-700"
                >
                  Company Address
                </label>
                <input
                  className="border rounded py-2 px-3 h-10 w-full placeholder-[#9199A3]"
                  id="companyAddress"
                  name="companyAddress"
                  type="text"
                  value={userData.companyAddress}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="companyWebsite"
                  className="mb-2 text-sm font-medium text-gray-700"
                >
                  Company Website
                </label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-2.5 text-gray-500">
                    <PiLinkSimpleLight className="text-blue-600" />
                  </span>
                  <input
                    className="border rounded py-2 pl-10 pr-3 h-10 w-full placeholder-[#9199A3]"
                    id="companyWebsite"
                    name="companyWebsite"
                    type="url"
                    value={userData.companyWebsite}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="col-span-8">
            <hr className="border-gray-300" />
          </div>

          <div className="col-span-8 flex flex-col">
            <h1 className="text-lg font-semibold text-gray-700">About us</h1>
            <textarea
              className="border rounded py-2 px-3 h-24 w-full placeholder-[#9199A3] hover:border-bg-blue-100"
              name="aboutUs"
              value={userData.aboutUs}
              onChange={handleInputChange}
              placeholder="Write down about your company here. Let the candidate know who we are..."
            />
            <button
              className="bg-blue-500 text-white font-bold py-2 px-4 mt-8 rounded h-10 w-52"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </>
      ) : role === "applicant" ? (
        <>
          <div className="col-span-2 flex justify-center">
            <UploadFile
              onFileSelected={handleImageSelected}
              initialFile={
                userData.image
                  ? { url: userData.image, name: "Profile Image" }
                  : null
              }
            />
          </div>
          <div className="col-span-6">
            <form className="space-y-6">
              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="mb-2 text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  className="border rounded py-2 px-3 font-normal h-10 w-full placeholder-[#9199A3]"
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={userData.fullName}
                  disabled
                />
                <p className="text-xs text-red-500">Names cannot be edited*</p>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="title"
                  className="mb-2 text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  className="border rounded py-2 px-3 h-10 w-full placeholder-[#9199A3]"
                  id="title"
                  name="title"
                  type="text"
                  value={userData.title}
                  onChange={handleInputChange}
                  placeholder="Ex: Junior Developer"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="personalWebsite"
                  className="mb-2 text-sm font-medium text-gray-700"
                >
                  Personal Website
                </label>
                <div className="relative w-full">
                  <span className="absolute left-3 top-2.5 text-gray-500">
                    <PiLinkSimpleLight className="text-blue-600" />
                  </span>
                  <input
                    className="border rounded py-2 pl-10 pr-3 h-10 w-full placeholder-[#9199A3]"
                    id="personalWebsite"
                    name="personalWebsite"
                    type="url"
                    value={userData.personalWebsite}
                    onChange={handleInputChange}
                    placeholder="Website URL"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="px-32 col-span-8 flex flex-col">
            <h1 className="text-lg font-semibold text-gray-700 mb-10">
              Your CV/Resume
            </h1>
            <UploadPDF
              onFileSelected={handleFileSelected}
              initialFile={null}
              cv={userData.cv}
            />

            <div className="flex justify-end">
              <button
                className="bg-blue-600 text-white font-bold py-2 px-4 mt-8 rounded-lg h-14 w-52"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="col-span-8 text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
