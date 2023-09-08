import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SyncImage from "../assets/background.png";

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        formData
      );
      const { token, user } = response.data;
      const userRole = user.role;

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", userRole);

      if (userRole === "SuperAdmin") {
        history.push("/dashboard/superadmin");
      } else if (userRole === "Admin") {
        history.push("/dashboard/admin");
      } else if (userRole === "NewsEntry") {
        history.push("/dashboard/newsentry");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage(
          "Invalid credentials. Please check your username and password."
        );
      } else if (error.response && error.response.status === 404) {
        setErrorMessage(
          "User not found. Please check your username and try again."
        );
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center p-0"
      style={{
        backgroundImage: `url(${SyncImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="row justify-content-center m-0">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Sign In</h3>
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
