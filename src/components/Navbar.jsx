/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Start a Search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/post-job", title: "Post A Job" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-2">
        <a href="/" className="flex items-center gap-2 text-2xl">
          <img src="/images/logo.png" alt="logo" className="w-[80px] h-auto"/>
          {/* <span>KaamKaj</span> */}
        </a>

        {/* nav items */}

        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-blue-400">
              <NavLink
                to={path}
                className={({ isActive }) => isActive ? "active" : ""}
              >
                {title}
              </NavLink>
            </li>
          ))}
         

        </ul>

        {/* signup and login */}

        <div className="text-base text-blue-400 font-medium space-x-5 hidden lg:block">
          <Link to="/login" className="py-2 px-5 border rounded">Login</Link>
          <Link to="/signup" className="py-2 px-5 border rounded bg-blue-500 text-white">Signup</Link>
        </div>

        {/* mobile menu */}
        <div className="md:hidden block">

          <button onClick={handleMenuToggler}>
            {
              isMenuOpen?<FaXmark className="w-5 h-5 text-primary"/>:<FaBarsStaggered className="w-5 h-5 text-primary"/>
            }
 
          </button>
        </div>
      </nav>


      {/* navitmes for mobile */}
      <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
        <ul>
        {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-white first:text-white py-1">
              <NavLink
                to={path}
                className={({ isActive }) => isActive ? "active" : ""}
              >
                {title}
              </NavLink>
            </li>
          ))}

          <li className="text-white py-1">

        
                    <Link to="/login" >Login</Link>

                    </li>
        </ul>

      </div>




    </header>
  );
};

export default Navbar;
