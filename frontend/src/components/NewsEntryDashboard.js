import React from "react";

const NewsEntryDashboard = () => {
  // Replace 'userRole' with the actual key in local storage that holds the user's role
  const userRole = localStorage.getItem("userRole");

  // Access control logic for NewsEntryDashboard
  if (userRole !== "NewsEntry") {
    return <div>You don't have access to this page.</div>;
  }

  return (
    <div>
      <h2>Welcome to the NewsEntry Dashboard</h2>
      <p>This is the dashboard for NewsEntry users.</p>
    </div>
  );
};

export default NewsEntryDashboard;
