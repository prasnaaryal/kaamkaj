import React from "react";
import { Menu, MenuItem } from "react-pro-sidebar";
import { FaBriefcase, FaBookmark, FaUser, FaCog } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

const Sidebar = () => {
  const menuItems = [
    { href: "/manage/dashboard", icon: MdDashboard, label: "Dashboard" },
    {
      href: "/manage/my-job",
      icon: FaBriefcase,
      label: "Jobs",
      role: "company",
    },
    {
      href: "/manage/post-job",
      icon: FaBriefcase,
      label: "Post A Job",
      role: "company",
    },
    {
      href: "/manage/applied-jobs",
      icon: FaBriefcase,
      label: "Applied Jobs",
      role: "applicant",
    },
    {
      href: "/manage/saved-jobs",
      icon: FaBookmark,
      label: "Saved Jobs",
      role: "applicant",
    },
    { href: "/manage/edit-profile", icon: FaUser, label: "Profile" },
    { href: "/manage/settings", icon: FaCog, label: "Settings" },
  ];

  const name = localStorage.getItem("fullName");
  const role = localStorage.getItem("role");

  return (
    <div className="flex">
      <div className="bg-white border-r border-gray-200 h-screen w-64 shadow-md">
        <div className="p-4 space-y-6">
          <div className="px-4 py-5 bg-blue-50 rounded-lg flex items-center gap-5 text-xl font-normal shadow-md">
            <RxAvatar className="w-10 h-10" />
            {name}
          </div>

          <div className="border-[.5px]" />

          <Menu className="w-full">
            {menuItems
              .filter((item) => !item.role || item.role === role)
              .map((item, index) => (
                <MenuItem
                  key={index}
                  className={`hover:bg-blue-100 text-gray-800 flex items-center w-full rounded-md transition-colors duration-300 ease-in-out my-1 ${
                    window.location.pathname === item.href ? "bg-blue-200" : ""
                  }`}
                >
                  <Link to={item.href} className="flex items-center !w-full">
                    {item.icon && <item.icon className="w-6" />}
                    <span className="ml-3 text-base w-full">{item.label}</span>
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
