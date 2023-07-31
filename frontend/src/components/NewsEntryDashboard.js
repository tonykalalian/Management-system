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
    <div className="container-fluid">
      <div className="row">
        <Sidebar userRole={userRole} />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="pt-3 pb-2 mb-3">
            <h2 className="h4">Welcome to the News Entry Dashboard</h2>
            <p className="lead">This is the dashboard for News Entry.</p>
            <div className="card shadow">
              <div className="card-body">
                <h5 className="card-title">Sync Digital Solutions</h5>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewsEntryDashboard;
