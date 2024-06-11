import MainLayout from "../layouts/MainLayout";

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
      path: "job-detail",
      element: <JobDetail />,
    },
  ],
};

export default AuthenticationRoutes;
