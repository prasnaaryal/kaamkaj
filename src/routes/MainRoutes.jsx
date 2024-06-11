import MainLayout from "../layouts/MainLayout";

// Pages
import Dashboard from "../Pages/manage/Dashboard";
import SavedJobs from "../Pages/User/SavedJobs";
import AppliedJobs from "../Pages/User/AppliedJobs";
import EditProfile from "../Pages/manage/EditProfile";
import JobDetail from "../Pages/JobDetail/JobDetail";
import UpdateJob from "../Pages/UpdateJob";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import Settings from "../Pages/Settings";
import NewHomePage from "../Pages/HomePage/NewHomePage";

const MainRoutes = {
  path: "/manage",
  element: <MainLayout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "saved-jobs",
      element: <SavedJobs />,
    },
    {
      path: "applied-jobs",
      element: <AppliedJobs />,
    },
    {
      path: "edit-profile",
      element: <EditProfile />,
    },
   
    {
      path: "settings",
      element: <Settings/>,
    },
   
    {
      path: "edit-job/:id",
      element: <UpdateJob />,
      loader: ({ params }) =>
        fetch(`http://localhost:3000/all-jobs/${params.id}`),
    },
    {
      path: "post-job",
      element: <CreateJob />,
    },
    {
      path: "my-job",
      element: <MyJobs />,
    },
  ],
};

export default MainRoutes;
