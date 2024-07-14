import React, { useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

const Search = ({
  query,
  location,
  handleInputChange,
  handleLocationChange,
  handleSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchLocation, setSearchLocation] = useState(location);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(searchQuery, searchLocation);
  };

  return (
    <div className="relative">
      <div>
        <img
          src="images/homebanner.png"
          className="w-[100vw] h-[80vh] object-cover"
          alt="image1"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <h1 className="text-white text-6xl font-bold">
          Find Your <span className="text-blue-600">New Job</span> Today
        </h1>
        <p className="text-2xl text-white mt-4">
          Thousands of jobs in computing, engineering searching for you
        </p>

        <div className="bg-white bg-opacity-20 p-2 rounded-md w-xl mt-20 xl:w-[790px]">
          <div className="bg-white p-4 rounded-md w-full">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-start md:flex-row flex-col md:gap-0 gap-4">
                <div className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/2 w-full">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="What position are you looking for?"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                  />
                  <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
                </div>
                <div className="flex md:rounded-s-none rounded shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 md:w-1/3 w-full">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="Location"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:right-0 sm:text-sm sm:leading-6"
                    onChange={(e) => setSearchLocation(e.target.value)}
                    value={searchLocation}
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
        </div>
      </div>
    </div>
  );
};

export default Search;
