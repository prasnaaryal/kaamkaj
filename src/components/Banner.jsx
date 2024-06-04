import React, { useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

const Banner = ({ query, handleInputChange }) => {
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 md:py-20 py-14">
      <div className="grid grid-cols-12 gap-2">
        <div className="col-span-9">
          <div className="">
            <h1 className="text-5xl font-bold text-primary mb-3">
              Find your
              <span className="text-blue-500"> new job </span>
              today
            </h1>
            <p className="text-lg text-black/70 mb-8">
              Thousands of jobs in the computer,engineering and technology
            </p>
          </div>

          <form>
            <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
              <div
                className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset 
                focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full"
              >
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="What position are you looking for?"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900
                      placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
                  onChange={handleInputChange}
                  value={query}
                />

                <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
              </div>
              <div className="flex md:rounded-s-none rounded shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full">
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Location"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
                  // value={""}
                />

                <FiMapPin className="z-0 absolute mt-2.5 ml-2 text-gray-400" />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-8 md:rounded-s-none rounded"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="col-span-3">
          <img src="images\Illustration.png" alt="" />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex justify-center gap-10 py-4">
          <div className="flex items-center space-x-2 m-4">
            <img src="images/Icon.png" alt="" />
            <div className="text-center">
              <p>1550</p>
              <p>Live Job</p>
            </div>
          </div>

          <div className="flex flex-col gap-8 items-center">
            <div className="flex justify-center py-4">
              <div className="flex items-center space-x-4 m-4">
                <div className="flex items-center justify-between w-[170px] h-22 bg-white shadow-md rounded-lg p-4">
                  <img src="images/Icon1.png" alt="" className="w-12 h-12" />
                  <div className="text-center ml-2">
                    <p className="text-lg font-semibold">1550</p>
                    <p className="text-gray-500">Live Job</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 m-4">
            <img src="images/Icon2.png" alt="" />
            <div className="text-center">
              <p>1550</p>
              <p>Live Job</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 m-4">
            <img src="images/Icon3.png" alt="" />
            <div className="text-center">
              <p>1550</p>
              <p>Live Job</p>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-between w-full
         bg-[#F1F2F4] shadow-md px-4 py-8"
        >
          <p className="font-semibold text-2xl m-8">How KaamKaj works</p>
          <img src="images\Process.png" alt="Process" />
        </div>
      </div>
    </div>

 
  );
};



export default Banner;
