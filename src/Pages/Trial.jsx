import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FaTachometerAlt, FaBriefcase, FaBookmark, FaUser, FaCog } from 'react-icons/fa'; // Importing icons
import { FiMapPin, FiSearch } from "react-icons/fi";

const Trial = ({ query, handleInputChange }) => {
  return (
    <div className="bg-white border-r border-gray-200 h-screen w-64 shadow-md">
      <div className="p-4">
        <Menu iconShape="square">
          <MenuItem icon={<FaTachometerAlt />} className="hover:bg-blue-100 text-gray-800 flex items-center p-2 my-2 rounded-md">
            Dashboard
          </MenuItem>
          <MenuItem icon={<FaBriefcase />} className="hover:bg-blue-100 text-gray-800 flex items-center p-2 my-2 rounded-md">
            Jobs
          </MenuItem>
          <MenuItem icon={<FaBookmark />} className="hover:bg-blue-100 text-gray-800 flex items-center p-2 my-2 rounded-md">
            Saved Jobs
          </MenuItem>
          <MenuItem icon={<FaUser />} className="hover:bg-blue-100 text-gray-800 flex items-center p-2 my-2 rounded-md">
            Profile
          </MenuItem>
          <MenuItem icon={<FaCog />} className="hover:bg-blue-100 text-gray-800 flex items-center p-2 my-2 rounded-md">
            Settings
          </MenuItem>
        </Menu>
      </div>
    </div>

 



  
  );
};

export default Trial;
