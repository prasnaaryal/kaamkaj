import React from "react";
import { PiLinkSimpleLight } from "react-icons/pi";

const Settings = () => {
  return (
    <div>
          <div className="">
        <h1>Change Password</h1>
        

        <div className="mt-4 shadow-md border border-gray-300 rounded-lg p-4 flex items-center bg-[#E7F0FA]">
          <form className="space-y-6">
            <div className="flex flex-col">
              <label
                htmlFor="companyName"
                className="mb-2 text-sm font-medium text-gray-700"
              >
                Old Password{" "}
              </label>
              <input
                className="border rounded py-2 px-3 font-normal h-10 w-72 placeholder-[#9199A3]"
                id="oldPassword"
                type="text"
                placeholder="*****"
              />
            </div>
            <div className="flex gap-6">
              <div className="flex flex-col">
                <label
                  htmlFor="companyAddress"
                  className="mb-2 text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  className="border rounded py-2 px-3 h-10 w-72 placeholder-[#9199A3]"
                  id="companyAddress"
                  type="text"
                  placeholder="New Password"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="companyAddress"
                  className="mb-2 text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  className="border rounded py-2 px-3 h-10 w-72 placeholder-[#9199A3]"
                  id="companyAddress"
                  type="text"
                  placeholder="New Password"
                />
              </div>

              <div>
             
               </div>
            </div>
          </form>
        </div>

        <div className="mt-8">
        <button
            className="bg-[#0A65CC] text-white font-semibold  px-8 py-2 rounded-lg mb-4"
          >         Save Changes
          </button>
        </div>

        


        
      </div>

      <div className="mt-4 shadow-md border border-gray-300 rounded-lg p-4 flex items-center bg-[#E7F0FA]">
        <h1>Deactivate Account</h1>
        <div className="mt-8">
        <button
            className="bg-red-700 text-white font-semibold  px-8 py-2 rounded-lg mb-4"
          >         Deactivate Account
          </button>
        </div>

          </div>

      </div>
    
  );
};

export default Settings;
