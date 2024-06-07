import React from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaBriefcase,
  FaBookmark,
  FaUser,
  FaCog,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  const menuItems = [
    { href: "/manage/dashboard", icon: MdDashboard, label: "Dashboard" },
    { href: "/manage/my-job", icon: FaBriefcase, label: "Jobs" },
    { href: "/manage/saved-jobs", icon: FaBookmark, label: "Saved Jobs" },
    { href: "/manage/edit-profile", icon: FaUser, label: "Profile" },
    { href: "/manage/settings", icon: FaCog, label: "Settings" },
  ];

  return (
    <div className="flex">
      <div className="bg-white border-r border-gray-200 h-screen w-64 shadow-md">
        <div className="p-4">
          <Menu iconShape="square">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                className={`hover:bg-blue-100 text-gray-800 flex items-center p-3 my-2 rounded-md transition-colors duration-200 ease-in-out ${
                  window.location.pathname === item.href ? "bg-blue-200" : ""
                }`}
              >
                <Link to={item.href} className="flex items-center">
                  {item.icon && <item.icon className="w-6 h-6" />}
                  <span className="ml-3 text-lg">{item.label}</span>
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
