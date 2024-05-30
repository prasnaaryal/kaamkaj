import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-50 dark:bg-gray-800 ">
      <div className="flex p-2">
        <img className="w-10 h-10" src="images\image 8.png" alt="profilepic" />
        <h1 className="ml-2">John Doe</h1>
      </div>

      <div className="border-b-2"></div>

      <div className="pt-6">
        <aside
          id="logo-sidebar"
          className="h-full px-3 py-4 overflow-y-auto"
          aria-label="Sidebar"
        >
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>

                <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/my-job"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M1 18h16a1 1 0 0 0 1-1v-9H0v9a1 1 0 0 0 1 1ZM17 3h-5V1a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v2H1a1 1 0 0 0-1 1v3h18V4a1 1 0 0 0-1-1Z" />
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Jobs</span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
              >
                <FaBookmark className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-700 dark:group-hover:text-white" />

                <span className="flex-1 ml-3 whitespace-nowrap">
                  Saved Jobs
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
              >
                <FaUserCircle className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-blue-700 dark:group-hover:text-white" />

                <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-blue-700 group"
              >
                <IoSettingsSharp className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />

                <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
