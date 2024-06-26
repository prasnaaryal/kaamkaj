import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { loginRedux } from "D:/Developer/kaamkaj/src/redux/userSlice.js";

import { FaArrowRight } from "react-icons/fa";

import Modal from "../../../components/Modal";
import { toast } from "react-toastify";
import { BiHide, BiShow } from "react-icons/bi";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  console.log(data);

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = data;
    if (fullName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        console.log(data);
        const fetchData = await fetch(
          `${import.meta.env.VITE_BASE_URL}/auth/register`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const dataRes = await fetchData.json();
        console.log(dataRes);

        // alert(dataRes.message);
        toast(dataRes.message);
        if (dataRes.alert) {
          navigate("");
        }
      } else {
        alert("password and confirm password not equal");
      }
    } else {
      alert("Please Enter required fields");
    }
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (!email || !password) {
      toast.error("Please enter required fields");
      return;
    }

    try {
      const loginResponse = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const loginData = await loginResponse.json();

      if (!loginResponse.ok)
        throw new Error(loginData.message || "Login failed");

      toast.success(loginData.message);
      // alert(dataRes.message);

      // Save accessToken to local storage
      if (loginData.accessToken) {
        localStorage.setItem("accessToken", loginData.accessToken);
        const userResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}/user/load-user`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${loginData.accessToken}`,
            },
          }
        );

        const userData = await userResponse.json();
        console.log({userData})

        if (!userResponse.ok)
          throw new Error(userData.message || "Failed to load user data");

        dispatch(loginRedux({ ...loginData, user: userData }));

        // Redirect and refresh the page based on user role
        // const redirectUrl =
        //   userData.user.email === import.meta.env.VITE_REACT_APP_ADMIN_EMAIL
        //     ? "/manage/dashboard"
        //     : "/";
        // window.location.href = redirectUrl; // This will cause the page to refresh
      } else {
        toast.error(
          loginData.alert || "Authentication failed, please try again."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [forgetPasswordModal, setIsforgetPasswordModalOpen] = useState(false);

  const [isNestedModalOpen, setIsNestedModalOpen] = useState(false);
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    closeNestedModal();
  };

  const openNestedModal = () => setIsNestedModalOpen(true);
  const closeNestedModal = () => setIsNestedModalOpen(false);

  const openforgetPasswordModal = () => setIsforgetPasswordModalOpen(true);

  const closeLoginModal = () => setIsLoginModalOpen(false);

  const closeSignupModal = () => setIsSignupModalOpen(false);

  const closeforgetPasswordModal = () => setIsforgetPasswordModalOpen(false);

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
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4 border-b border-black/40">
      <nav className="flex justify-between items-center py-4 ">
        <a href="/" className="flex items-center gap-2 text-2xl">
          <img
            src="/images/image.png"
            alt="logo"
            className="w-[150px] h-auto"
          />
        </a>

        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-sx text-black/70 font-medium hover:text-blue-500"
            >
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
        </ul>
      </div>

      {/* login modal */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        title="Modal Title"
      >
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-xl">Welcome to KaamKaj</h1>
          <p className="text-base text-[#545454]">Log in</p>
        </div>
        <form onSubmit={handleSubmit2}>
          <div className="px-4 mt-10">
            <input
              className="border rounded-lg py-2 px-3 font-normal h-10 w-full placeholder-gray-600"
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="mt-6 px-4">
            <input
              type={showPassword ? "text" : "password"}
              className="border rounded-lg py-2 px-3 h-10 w-full placeholder-gray-600"
              id="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded h-10 w-full">
            Login
          </button>
        </form>
        <div className="mt-6 px-4">
          <div className="flex justify-between mt-4">
            <div>
              <p className="font-light text-sm">Remember me</p>
            </div>
            <div>
              <a
                href="#"
                className="no-underline hover:underline text-blue-500 font-light text-sm"
                onClick={() => {
                  closeLoginModal();
                  setIsforgetPasswordModalOpen(true);
                }}
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
              onClick={() => {
                closeLoginModal();
                setIsSignupModalOpen(true);
              }}
            >
              Sign Up
            </a>
          </div>
        </div>
      </Modal>

      {/* signup modal */}

      <Modal
        isOpen={isSignupModalOpen}
        onClose={closeSignupModal}
        title="Modal Title"
        className="w-full max-w-4xl"
      >
        <div className="flex gap-4">
          <div className="flex-1 w-full h-40 relative">
            <img
              className="w-full h-40 rounded absolute rotate-180 scale-x-[-1] object-cover"
              src="images/candidate.jpg"
              alt="candidate login"
            />
            <div className="relative flex flex-col items-center mt-10">
              <h1 className="text-xl font-medium">Become a Candidate</h1>
              <button
                className="mt-4 bg-white text-blue-400 font-semibold py-2 px-4 h-10 w-40 flex"
                onClick={openNestedModal}
              >
                Register Now <FaArrowRight className="mt-1 ml-2" />
              </button>
            </div>
          </div>

          <div className="flex-1 relative">
            <img
              className="w-full h-40 absolute rounded"
              src="images/Employers.jpg"
              alt="employers login"
            />
            <div className="relative flex flex-col items-center mt-10">
              <h1 className="text-xl font-medium">Become an Employer</h1>
              <button
                className="mt-4 bg-white text-blue-400 font-semibold py-2 px-4 h-10 w-40 flex"
                onClick={openNestedModal}
              >
                Register Now <FaArrowRight className="mt-1 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isNestedModalOpen}
        onClose={closeNestedModal}
        title="Nested Modal"
        className="w-full max-w-md"
      >
        <div className="pb-4 px-4">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-xl">Welcome to KaamKaj</h1>
            <p className="text-base text-[#545454]">Sign Up as an Company</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="px-4 mt-10">
              <input
                className="border rounded-lg py-2 px-3 font-normal h-10 w-full placeholder-gray-600"
                id="name"
                type={"text"}
                name="fullName"
                placeholder="Full Name"
                value={data.fullName}
                onChange={handleOnChange}
              />
            </div>
            <div className="mt-6 px-4">
              <input
                className="border rounded-lg py-2 px-3 h-10 w-full placeholder-gray-600"
                id="email"
                type={"email"}
                name="email"
                placeholder="Email"
                value={data.email}
                onChange={handleOnChange}
              />
            </div>
            <div className="mt-6 px-4">
              <div className="relative">
                <input
                  className="border rounded-lg py-2 px-3 h-10 w-full placeholder-gray-600"
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={data.password}
                  onChange={handleOnChange}
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <BiShow /> : <BiHide />}
                </span>
              </div>
            </div>
            <div className="mt-6 px-4">
              <div className="relative">
                <input
                  className="border rounded-lg py-2 px-3 h-10 w-full placeholder-gray-600"
                  id="confirmpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={handleShowConfirmPassword}
                >
                  {showConfirmPassword ? <BiShow /> : <BiHide />}
                </span>
              </div>
            </div>
            <button className="bg-blue-500 text-white font-bold py-2 mt-8 px-4 rounded h-10 w-full">
              Sign Up{" "}
            </button>
          </form>
          <div className="mt-6 px-4">
            <div className="py-4 mt-4 border-t flex gap-2">
              <p className="text-sm font-light">Already have an Account?</p>
              <a
                href="#"
                className="no-underline hover:underline text-blue-500 font-light text-sm"
                onClick={() => {
                  closeSignupModal();
                  closeNestedModal();
                  setIsLoginModalOpen(true);
                }}
              >
                Login
              </a>
            </div>
          </div>
          {/* <button
            className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
            onClick={closeNestedModal}
          >
            Close Nested Modal
          </button> */}
        </div>
      </Modal>

      <Modal
        isOpen={forgetPasswordModal}
        onClose={closeforgetPasswordModal}
        title="Forgot Password?"
      >
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-xl">Forgot Password?</h1>
          <p className="text-base text-[#545454]">
            Please enter your email address and we will send you an email to
            update your password.
          </p>
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
        </form>
        <div className="mt-6 px-4">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded h-10 w-full">
            Submit
          </button>
          <div className="flex justify-between mt-4">
            <div>
              <a
                href="#"
                className="no-underline hover:underline text-blue-500 font-light text-sm"
                onClick={() => {
                  closeforgetPasswordModal();
                  setIsLoginModalOpen(true);
                }}
              >
                Back to login
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default Navbar;
