import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("projects");

  // Get the tab from the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    console.log(tabFromUrl);
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* Profile */}
      {tab === "profile" && <DashProfile />}
    </div>
  );
}

export default Dashboard;
