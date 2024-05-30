import React from "react";
import { FaOpencart } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <Sidebar />
        <div className="p-4 flex flex-col gap-4 w-full">
          <h1 className="font-semibold text-2xl">Welcome back !!</h1>
          <div className="border border-blue-500"></div>
          <div className="grid grid-cols-12 gap-3 w-full">
            
            <div className="col-span-4 shadow-md border border-gray-300 rounded-lg p-4 flex items-center bg-[#E7F0FA]">
              <div className="grid grid-cols-12 gap-2 w-full px-6">
                <div className="col-span-9 flex flex-col gap-2 items-center justify-center">
                  <h2 className="font-semibold text-2xl">11</h2>
                  <p className="font-semibold text-xl text-gray-400">
                    Applied jobs
                  </p>
                </div>
                <div className="col-span-3 flex items-center justify-center">
                  <img className="w-16 h-14" src="images/Icon (4).png" alt="" />
                </div>
              </div>
            </div>

            <div className="col-span-4 shadow-md border border-gray-300 rounded-lg p-4 flex items-center bg-[#FFF6E6]">
              <div className="grid grid-cols-12 gap-2 w-full px-6">
                <div className="col-span-9 flex flex-col gap-2 items-center justify-center">
                  <h2 className="font-semibold text-2xl">20</h2>
                  <p className="font-semibold text-xl text-gray-400">
                    Saved Jobs
                  </p>
                </div>
                <div className="col-span-3 flex items-center justify-center">
                  <img className="w-16 h-14" src="images/Icon (5).png" alt="" />
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
