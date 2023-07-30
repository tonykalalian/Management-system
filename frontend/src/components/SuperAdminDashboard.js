import React from "react";
import { useHistory } from "react-router-dom";

const SuperAdminDashboard = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Remove the token and user role from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");

    // Redirect to the login page after logout
    history.push("/");
  };

  return (
    <div>
      {/* Your content specific to SuperAdmin */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default SuperAdminDashboard;
