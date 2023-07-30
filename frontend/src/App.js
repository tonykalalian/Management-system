import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import SuperAdminDashboard from "./components/SuperAdminDashboard";
import AdminDashboard from "./components/AdminDashboard";
import NewsEntryDashboard from "./components/NewsEntryDashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Check if the user is already logged in (e.g., after a page refresh)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  // Handle successful login
  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  // Handle logout
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userRole");
  //   setIsLoggedIn(false);
  //   setUserRole("");
  // };

  // Redirect to the appropriate dashboard based on the user's role
  const renderDashboard = () => {
    if (!isLoggedIn) {
      return <Redirect to="/" />;
    } else {
      if (userRole === "SuperAdmin") {
        return <Redirect to="/dashboard/superadmin" />;
      } else if (userRole === "Admin") {
        return <Redirect to="/dashboard/admin" />;
      } else if (userRole === "NewsEntry") {
        return <Redirect to="/dashboard/newsentry" />;
      } else {
        return <Redirect to="/" />;
      }
    }
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Login onLogin={handleLogin} />} />
        <Route exact path="/dashboard" render={renderDashboard} />
        <Route
          exact
          path="/dashboard/superadmin"
          component={SuperAdminDashboard}
        />
        <Route exact path="/dashboard/admin" component={AdminDashboard} />
        <Route
          exact
          path="/dashboard/newsentry"
          component={NewsEntryDashboard}
        />
        <Route component={Login} /> {/* Default route for Login component */}
      </Switch>
    </Router>
  );
};

export default App;
