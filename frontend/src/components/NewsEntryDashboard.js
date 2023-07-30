import React from "react";
import Sidebar from "./Sidebar";

const NewsEntryDashboard = () => {
  // Replace 'userRole' with the actual key in local storage that holds the user's role
  const userRole = localStorage.getItem("userRole");

  // Access control logic for NewsEntryDashboard
  if (userRole !== "NewsEntry") {
    return <div>You don't have access to this page.</div>;
  }

  return (
    <div className="d-flex">
      <Sidebar userRole={userRole} />
      <div>
        <h2>Welcome to the News Entry Dashboard</h2>
        <p>This is the dashboard for News Entry.</p>
      </div>
    </div>
  );
};

export default NewsEntryDashboard;
