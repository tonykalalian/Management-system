import React from "react";
import Sidebar from "./Sidebar";

const SuperAdminDashboard = () => {
  const userRole = localStorage.getItem("userRole");

  // Access control logic for SuperAdminDashboard
  if (userRole !== "SuperAdmin") {
    return <div>You don't have access to this page.</div>;
  }

  return (
    <div className="d-flex">
      <Sidebar userRole={userRole} />
      <div>
        <h1 style={{ justifyContent: "center" }}>
          Welcome to the SuperAdmin Dashboard
        </h1>
        <p>This is the dashboard for Superadmin.</p>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
