import React from "react";
import { IoArrowRedo } from "react-icons/io5";
import {
  MdFavoriteBorder,
  MdOutlineEmail,
  MdOutlineMailOutline,
} from "react-icons/md";
import { FaLocationDot, FaPhone } from "react-icons/fa6";

const Rightbar = () => {
  return (
    <div>
      <div className="bg-white shadow-lg mt-10 rounded-xl h-44 w-[350px]">
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
          >
            <MdFavoriteBorder className="text-orange-500" />
            <span>Save</span>
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            size="lg"
            className="rounded-lg w-72 h-12 bg-[#3B82F6] bg-opacity-20 border-[#3B82F6] border-2"
          >
            Apply Now
          </button>
        </div>
      </div>

      <div className="bg-white mt-10  shadow-lg rounded-xl h-[913px] w-[350px]">
        <h1 className="p-6 font-semibold text-lg">Featured Property</h1>
        <div className="border-b-2"></div>

        <div className="flex m-6">
          <img
            src="images\Icon1.png"
            className="w-18 h-10"
            alt="profile img"
          />
          <div className="p-6">
            <h1 className="text-lg font-semibold mt-4">Westchester Village</h1>
            <p className="text-slate-500 font-sm">July 24, 2022</p>
            <p className="flex gap-2 mb-6">
              <FaLocationDot className="text-teal-400 mt-1" />
              3599 Huntz Lane
            </p>
            <button className="rounded-full w-14 h-7 bg-teal-200 bg-opacity-30 text-teal-500">
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
