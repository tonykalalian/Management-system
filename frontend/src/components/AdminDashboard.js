import React from "react";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  // Replace 'userRole' with the actual key in local storage that holds the user's role
  const userRole = localStorage.getItem("userRole");

  // Access control logic for NewsEntryDashboard
  if (userRole !== "Admin") {
    return <div>You don't have access to this page.</div>;
  }

  return (
    <div className="d-flex">
      <Sidebar userRole={userRole} />
      <div>
        <h2>Welcome to the Admin Dashboard</h2>
        <p>This is the dashboard for Admin.</p>
      </div>
    </div>
  );
};
export default AdminDashboard;
