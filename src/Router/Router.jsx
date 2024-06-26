import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/UpdateJob";
import JobDetail from "../Pages/JobDetail/JobDetail";
import Dashboard from "../Pages/manage/Dashboard";
import EditProfile from "../Pages/manage/EditProfile";
import AppliedJobs from "../Pages/User/AppliedJobs";
import SavedJobs from "../Pages/User/SavedJobs";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post-job",
        element: <CreateJob/>,
      },
      {
        path: "/my-job",
        element: <MyJobs/>,
      },
      {
        path: "/salary",
        element: <SalaryPage/>,
      },
      {
        path: "/dashboard",
        element: <Dashboard/>,
      },
      {
        path: "/savedjobs",
        element: <SavedJobs/>,
      },
      {
        path: "/appliedjobs",
        element: <AppliedJobs/>,
      },
      {
        path: "/editprofile",
        element: <EditProfile/>,
      },
      {
        path: "/jobdetail",
        element: <JobDetail/>,
        // loader:({params})=> fetch(`http://localhost:3000/all-jobs/${params.id}`)

      },
      {
        path: "/edit-job/:id",
        element: <UpdateJob/>,
        loader:({params})=> fetch(`http://localhost:3000/all-jobs/${params.id}`)
      },
     
    ],
  },
]);

export default router;
