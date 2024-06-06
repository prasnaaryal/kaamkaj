import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import Card from "../../../components/Card";

const FeaturedJobs = () => {
  return (
    <div className="container mx-auto px-4 py-8 relative mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Featured Jobs</h1>
      <div className="flex flex-wrap gap-8 justify-center relative z-10">
        {/* Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xs">
          <div className="flex items-center">
            <img
              src="images\Notion.png"
              alt="Company Logo"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">Software Engineer</h2>
              <p className="text-gray-500">July 24, 2024</p>
              <p className="flex items-center text-gray-500">
                <FaMapMarkerAlt className="mr-1" /> Kathmandu
              </p>
              <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded">
                Full-time
              </span>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xs">
          <div className="flex items-center">
            <img
              src="images\Notion.png"
              alt="Company Logo"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">Software Engineer</h2>
              <p className="text-gray-500">July 24, 2024</p>
              <p className="flex items-center text-gray-500">
                <FaMapMarkerAlt className="mr-1" /> Kathmandu
              </p>
              <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded">
                Full-time
              </span>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xs">
          <div className="flex items-center">
            <img
              src="images\Notion.png"
              alt="Company Logo"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">Software Engineer</h2>
              <p className="text-gray-500">July 24, 2024</p>
              <p className="flex items-center text-gray-500">
                <FaMapMarkerAlt className="mr-1" /> Kathmandu
              </p>
              <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded">
                Full-time
              </span>
            </div>
          </div>
        </div>
         {/* Card 3 */}
         <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xs mt-10">
          <div className="flex items-center">
            <img
              src="images\Notion.png"
              alt="Company Logo"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">Software Engineer</h2>
              <p className="text-gray-500">July 24, 2024</p>
              <p className="flex items-center text-gray-500">
                <FaMapMarkerAlt className="mr-1" /> Kathmandu
              </p>
              <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded">
                Full-time
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xs mt-10">
          <div className="flex items-center">
            <img
              src="images\Notion.png"
              alt="Company Logo"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">Software Engineer</h2>
              <p className="text-gray-500">July 24, 2024</p>
              <p className="flex items-center text-gray-500">
                <FaMapMarkerAlt className="mr-1" /> Kathmandu
              </p>
              <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded">
                Full-time
              </span>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-xs mt-10">
          <div className="flex items-center">
            <img
              src="images\Notion.png"
              alt="Company Logo"
              className="w-12 h-12 mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">Software Engineer</h2>
              <p className="text-gray-500">July 24, 2024</p>
              <p className="flex items-center text-gray-500">
                <FaMapMarkerAlt className="mr-1" /> Kathmandu
              </p>
              <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded">
                Full-time
              </span>
            </div>
          </div>
        </div>
        {/* Repeat the card structure for additional cards */}
      </div>
      <img
        src="images\Group.png"
        alt="Illustration"
        className="absolute right-0 top- 1/2/2 transform -translate-y-1/2 opacity z-0"
        style={{ width: '100px', height: 'auto' }}
      />
    </div>
  );
};

export default FeaturedJobs;
