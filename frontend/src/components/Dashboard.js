import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const history = useHistory();

  // Replace this with your actual authentication logic to check if the user is logged in or not
  const isLoggedIn = true;
  const userRole = "SuperAdmin"; // Replace with the actual user role obtained from local storage

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/"); // Redirect to login page if not logged in
    } else {
      // Redirect to the appropriate dashboard based on the user's role
      if (userRole === "SuperAdmin") {
        history.push("/dashboard/superadmin");
      } else if (userRole === "Admin") {
        history.push("/dashboard/admin");
      } else if (userRole === "NewsEntry") {
        history.push("/dashboard/newsentry");
      }
    }
  }, [history, isLoggedIn, userRole]);

  return <div></div>; // You can add a loading spinner or some content here
};

export default Dashboard;
