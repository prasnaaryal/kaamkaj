import { FaQ } from "react-icons/fa6";
import MainLayout from "../layouts/MainLayout";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import FAQ from "../Pages/Faq";

// Pages
import Home from "../Pages/Home";
import NewHomePage from "../Pages/HomePage/NewHomePage";
import JobDetail from "../Pages/JobDetail/JobDetail";
import SalaryPage from "../Pages/SalaryPage";
import Trial from "../Pages/Trial";

const AuthenticationRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "",
      element: <NewHomePage />,
    },
    {
      path: "trial",
      element: <Trial />,
    },
    // {
    //   path: "newhome",
    //   element: <NewHomePage/>,
    // },
    {
      path: "salary",
      element: <SalaryPage />,
    },
    {
      path: "job/:id",
      element: <JobDetail />,
    },
    {
      path: "aboutus",
      element: <About/>,
    },
    {
      path: "contactus",
      element: <Contact/>,
    },
    {
      path: "faq",
      element: <FAQ/>,
    },
  ],

};

export default AuthenticationRoutes;
