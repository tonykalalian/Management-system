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
import ManageUsers from "./components/ManageUsers";
import ManageCategory from "./components/ManageCategory";
import ManageNews from "./components/ManageNews";
import AddNews from "./components/AddNews";
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole("");
  };

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
          render={() => (
            <SuperAdminDashboard
              userRole={userRole}
              handleLogout={handleLogout}
            />
          )}
        />
        <Route exact path="/dashboard/admin" component={AdminDashboard} />
        <Route
          exact
          path="/dashboard/newsentry"
          component={NewsEntryDashboard}
        />
        <Route exact path="/dashboard/manageusers" component={ManageUsers} />{" "}
        <Route
          exact
          path="/dashboard/managecategories"
          component={ManageCategory}
        />{" "}
        <Route exact path="/dashboard/managenews" component={ManageNews} />{" "}
        <Route exact path="/dashboard/addnews" component={AddNews} />{" "}
        <Route component={Login} />
      </Switch>
    </Router>
  );
};

export default App;
