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
      <div className="container py-4">
        <h1 className="mb-4">Welcome to the SuperAdmin Dashboard</h1>
        <p>This is the dashboard for Superadmin.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-header">Card Title 1</div>
              <div className="card-body">
                <p className="card-text">
                Lydia Horkos
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-header">Card Title 2</div>
              <div className="card-body">
                <p className="card-text">
                  This is another sample card content. You can add more cards
                  here with relevant information for the SuperAdmin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
