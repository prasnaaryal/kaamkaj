import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Trial from "../../Pages/Trial";

function App() {
  const location = useLocation();
  const showSidebar = location.pathname.includes("/manage");

  return (
    <>
      <Navbar />

      {showSidebar ? (
        <Sidebar>
          <Outlet />
        </Sidebar>
      ) : (
        <Outlet />
      )}

      <Footer />
    </>
  );
}

export default App;
