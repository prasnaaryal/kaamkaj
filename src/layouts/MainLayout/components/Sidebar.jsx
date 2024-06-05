import React from 'react';
import { Menu, MenuItem } from 'react-pro-sidebar';
import { FaTachometerAlt, FaBriefcase, FaBookmark, FaUser, FaCog } from 'react-icons/fa'; // Importing icons
import { Link } from 'react-router-dom'; // Importing Link from react-router-dom
import { Outlet } from 'react-router-dom'; // Importing Outlet from react-router-dom
import { MdDashboard } from 'react-icons/md';

const Sidebar = () => {
  const menuItems = [
    { href: "/manage/dashboard", icon: MdDashboard 
    , label: "Dashboard" },
    { href: "/manage/my-job", icon: FaBriefcase, label: "Jobs" },
    { href: "/manage/saved-jobs", icon: FaBookmark, label: "Saved Jobs" },
    { href: "/manage/edit-profile", icon: FaUser, label: "Profile" },
    { href: "/manage/settings", icon: FaCog, label: "Settings" }
  ];

  return (
    <div className="flex">
      <div className="bg-white border-r border-gray-200 h-screen w-64 shadow-md">
        <div className="p-4">
          <Menu iconShape="square">
            {menuItems.map((item, index) => (
              <MenuItem key={index} className="hover:bg-blue-100 text-gray-800 flex items-center p-2 my-2 rounded-md">
                <Link to={item.href} className="flex items-center">
                  {item.icon && <item.icon className="w-5 h-5" />} {/* Ensure the icon is rendered */}
                  <span className="ml-3">{item.label}</span>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
