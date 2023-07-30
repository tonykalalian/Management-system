import React from "react";

const AdminDashboard = () => {
  // Replace 'userRole' with the actual key in local storage that holds the user's role
  const userRole = localStorage.getItem("userRole");

  // Access control logic for AdminDashboard
  if (userRole !== "Admin") {
    return <div>You don't have access to this page.</div>;
  }

  return <div>{/* Your content specific to Admin */}</div>;
};

export default AdminDashboard;
