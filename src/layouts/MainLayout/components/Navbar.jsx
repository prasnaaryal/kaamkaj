import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { loginRedux } from "../../../redux/userSlice";
import { FaArrowRight } from "react-icons/fa";
import Modal from "../../../components/Modal";
import { BiHide, BiShow } from "react-icons/bi";
import { useDispatch } from "react-redux";
import axiosInstance from "../../../config/axiosConfig";
import { useToast } from "../../../components/CustomToast";

const Navbar = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [forgetPasswordModal, setIsforgetPasswordModalOpen] = useState(false);
  const [isNestedModalOpen, setIsNestedModalOpen] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = data;
    if (fullName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const fetchData = await axiosInstance.post("/auth/register", data);
          const dataRes = fetchData.data;
          addToast(dataRes.message, "success");
          console.log({ dataRes });
          if (dataRes.message === "User created successfully") {
            closeSignupModal();
            closeNestedModal();
            openLoginModal();
          }
        } catch (error) {
          console.error("Registration error:", error);
          addToast(
            error.message || "Registration failed. Please try again.",
            "error"
          );
        }
      } else {
        alert("Password and confirm password do not match");
      }
    } else {
      alert("Please enter required fields");
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (!email || !password) {
      addToast("Please enter required fields", "error");
      return;
    }

    try {
      const loginResponse = await axiosInstance.post("/auth/login", data);
      const loginData = loginResponse.data;

      addToast(loginData.message, "success");

      if (loginData.accessToken) {
        localStorage.setItem("accessToken", loginData.accessToken);
        const userResponse = await axiosInstance.get("/user/load-user", {
          headers: {
            Authorization: `Bearer ${loginData.accessToken}`,
          },
        });

        const userData = userResponse.data;
        dispatch(loginRedux({ ...loginData, user: userData }));
        closeLoginModal();
      } else {
        addToast("Authentication failed, please try again.", "error");
      }
    } catch (error) {
      console.error("Login error:", error);
      addToast(error.message || "Login failed. Please try again.", "error");
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
    setIsNestedModalOpen(false);
  };

  const openNestedModal = () => {
    setIsNestedModalOpen(true);
  };

  const closeNestedModal = () => {
    setIsNestedModalOpen(false);
  };

  const openforgetPasswordModal = () => {
    setIsforgetPasswordModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const closeforgetPasswordModal = () => {
    setIsforgetPasswordModalOpen(false);
  };

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
        title="Login"
        className="max-w-lg"
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
            <p className="text-sm font-light">{"Don't have an Account?"}</p>
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
        title="Sign Up"
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
        title="Sign Up"
        className="w-full max-w-md"
      >
        <div className="pb-4 px-4">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-xl">Welcome to KaamKaj</h1>
            <p className="text-base text-[#545454]">Sign Up as a Company</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="px-4 mt-10">
              <input
                className="border rounded-lg py-2 px-3 font-normal h-10 w-full placeholder-gray-600"
                id="name"
                type="text"
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
                type="email"
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
              Sign Up
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
                  openLoginModal();
                }}
              >
                Login
              </a>
            </div>
          </div>
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
                  openLoginModal();
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
