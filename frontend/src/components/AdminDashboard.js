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
      <div className="container py-4">
        <h2 className="mb-4">Welcome to the Admin Dashboard</h2>
        <p>This is the dashboard for Admin.</p>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-3">
              <div className="card-header">Card Title 1</div>
              <div className="card-body">
                <p className="card-text">
                  This is a sample card content. You can add more cards here
                  with relevant information for the Admin.
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
                  here with relevant information for the Admin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
