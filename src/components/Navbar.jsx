import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import LoginModal from "../components/LoginModal";
import SignupModal from "./SignUpModal";
import Login from "../Pages/Login";
import Modal from "./Modal";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openLoginModal = () => isLoginModalOpen(true);
  const closeLoginModal = () => isLoginModalOpen(false);

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Start a Search" },
    { path: "/salary", title: "Salary Estimate" },
    { path: "/aboutus", title: "About us" },
    { path: "/contactus", title: "Contact us" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-2">
        <a href="/" className="flex items-center gap-2 text-2xl">
          <img src="/images/logo.png" alt="logo" className="w-[80px] h-auto" />
        </a>

        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-black-500 font-medium">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="text-base text-blue-400 font-medium space-x-5 hidden lg:block">
          <button
            className="py-2 px-5 border border-blue-500 rounded font-bold"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Login
          </button>
          <button
            className="py-2 px-5 border rounded bg-blue-500 text-white"
            onClick={() => setIsSignupModalOpen(true)}
          >
            Signup
          </button>
        </div>

        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary" />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`px-4 bg-black py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1"
            >
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
          <li className="text-white py-1">
            <Login />
          </li>
        </ul>
      </div>

      <Modal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        title="Modal Title"
      >
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-xl">Welcome to KaamKaj</h1>
          <p className="text-base text-[#545454]">Log in</p>
        </div>
        <form>
          <div className="px-4 mt-10">
            <input
              className="border rounded-lg py-2 px-3 font-normal h-10 w-full placeholder-gray-600"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mt-6 px-4">
            <input
              className="border rounded-lg py-2 px-3 h-10 w-full placeholder-gray-600"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
        </form>
        <div className="mt-6 px-4">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded h-10 w-full">
            Login
          </button>
          <div className="flex justify-between mt-4">
            <div>
              <p className="font-light text-sm">Remember me</p>
            </div>
            <div>
              <a
                href="#"
                className="no-underline hover:underline text-blue-500 font-light text-sm"
              >
                Forget Password?
              </a>
            </div>
          </div>
          <div className="py-4 mt-4 border-t flex gap-2">
            <p className="text-sm font-light">Dont have an Account?</p>
            <a
              href="#"
              className="no-underline hover:underline text-blue-500 font-light text-sm"
            >
              Sign Up
            </a>
          </div>
        </div>
      </Modal>

      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
      />
    </header>
  );
};

export default Navbar;
