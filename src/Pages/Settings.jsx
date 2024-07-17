import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/CustomToast";
import Modal from "../components/Modal";
import { GoAlertFill } from "react-icons/go";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../config/axiosConfig";

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchUserEmail = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const response = await axiosInstance.get("/user/load-user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserEmail(response.data.user.email);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserEmail();
  }, []);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);

    try {
      const response = await axiosInstance.post("/auth/change-password", {
        email: userEmail,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmNewPassword,
      });

      if (response.status === 200) {
        addToast("Password changed successfully", "success");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      addToast("Error changing password", "error");
    }
  };

  const handleDeactivateClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDeactivation = () => {
    localStorage.clear();
    addToast("Account deactivated", "success");
    navigate("/");
  };

  return (
    <div>
      <div className="">
        <h1 className="font-semibold">Change Password</h1>
        <div className="mt-4 border border-gray-300 rounded-lg p-4 flex flex-col">
          <form className="space-y-6">
            <div className="flex flex-col">
              <label
                htmlFor="oldPassword"
                className="mb-2 text-sm font-normal text-[#4F4F4F]"
              >
                Old Password{" "}
              </label>
              <div className="relative w-72">
                <input
                  className="border rounded py-2 px-3 font-normal h-10 w-full placeholder-[#9199A3]"
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  placeholder="*****"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col">
                <label
                  htmlFor="newPassword"
                  className="mb-2 text-sm font-normal text-[#4F4F4F]"
                >
                  New Password
                </label>
                <div className="relative w-72">
                  <input
                    className="border rounded py-2 px-3 h-10 w-full placeholder-[#9199A3]"
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="confirmNewPassword"
                  className="mb-2 text-sm font-normal text-[#4F4F4F]"
                >
                  Confirm New Password
                </label>
                <div className="relative w-72">
                  <input
                    className="border rounded py-2 px-3 h-10 w-full placeholder-[#9199A3]"
                    id="confirmNewPassword"
                    type={showConfirmNewPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                  <span
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                  >
                    {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {passwordMismatch && (
                  <span className="text-xs text-red-500">
                    Password mismatch
                  </span>
                )}
              </div>
            </div>
          </form>
          <div className="flex mt-8">
            <button
              className="bg-[#0A65CC] text-white font-semibold px-8 py-2 rounded-lg mb-4"
              onClick={handlePasswordChange}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 border border-gray-300 rounded-lg p-4 flex flex-col">
        <h1 className="font-semibold text-red-700 text-left mb-4">
          Deactivate Account
        </h1>
        <div className="flex justify-left">
          <button
            className="bg-red-700 text-white font-semibold px-8 py-2 rounded-lg"
            onClick={handleDeactivateClick}
          >
            Deactivate Account
          </button>
        </div>
        <p className="text-sm text-red-600 mt-4 left">
          *Once you deactivate this account, there is no going back. Please be
          certain.
        </p>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="max-w-md"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Are you sure you want to delete your account?
          </h2>
          <div className="flex justify-center items-center mb-4">
            <GoAlertFill className="text-red-500 w-12 h-12" />
          </div>
          <div className="flex justify-center space-x-36">
            <button
              className="bg-blue-500 text-white px-8 py-2 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              No
            </button>
            <button
              className="bg-red-500 text-white px-8 py-2 rounded"
              onClick={handleConfirmDeactivation}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
