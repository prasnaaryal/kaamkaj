import React from "react";
import { FaUserCircle, FaBookmark, FaTachometerAlt, FaBriefcase, FaCog } from "react-icons/fa"; // Imported additional icons
import { Outlet } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      href: "/manage/dashboard",
      icon: <FaTachometerAlt className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      href: "/manage/my-job",
      icon: <FaBriefcase className="w-5 h-5" />,
      label: "Jobs",
    },
    {
      href: "/manage/saved-jobs",
      icon: <FaBookmark className="w-5 h-5" />,
      label: "Saved Jobs",
    },
    {
      href: "/manage/edit-profile",
      icon: <FaUserCircle className="w-5 h-5" />,
      label: "Profile",
    },
    {
      href: "/manage/settings",
      icon: <FaCog className="w-5 h-5" />,
      label: "Settings",
    },
  ];

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-white border-r border-gray-200 shadow-md">
        {/* <div className="flex items-center p-4">
          <img
            className="w-10 h-10"
            src="images/image8.png"
            alt="profilepic"
          />
          <h1 className="ml-2 text-gray-800">John Doe</h1>
        </div> */}
        <div className="border-b border-gray-200"></div>
        <div className="pt-6">
          <aside className="h-full px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="flex items-center p-2 text-gray-800 rounded-lg hover:bg-blue-100"
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
