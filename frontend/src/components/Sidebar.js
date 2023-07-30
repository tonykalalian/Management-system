import React from "react";
import { BiCategory, BiNews, BiSync } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTags, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Sidebar = ({ userRole, handleLogout }) => {
  const location = useLocation();
  const history = useHistory();

  const sidebarLinks = [
    {
      title: "Categories",
      icon: <BiCategory size={16} />,
      link: "/categories",
    },
    {
      title: "Tags",
      icon: <FontAwesomeIcon icon={faTags} />,
      link: "/dashboard",
    },
    {
      title: "News",
      icon: <BiNews size={16} />,
      link: "/orders",
    },
  ];

  if (userRole === "SuperAdmin") {
    sidebarLinks.push({
      title: "User Management",
      icon: <FontAwesomeIcon icon={faUser} />,
      link: "/dashboard/manageusers",
    });
  }

  const handleLogoutClick = () => {
    // Clear any user-related data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");

    // Redirect to the login page
    history.push("/");
  };

  const getSidebarLinks = () => {
    return (
      <ul className="nav flex-column mb-auto">
        {sidebarLinks.map((link) => {
          // Check if the user is NewsEntry and the link is "Categories" or "Tags"
          if (
            userRole === "NewsEntry" &&
            (link.title === "Categories" || link.title === "Tags")
          ) {
            return null; // Hide the link for NewsEntry user
          }
          return (
            <li className="nav-item" key={link.title}>
              <Link
                to={link.link}
                className={`nav-link ${
                  location.pathname === link.link ? "active" : "link-dark"
                }`}
                aria-current={
                  location.pathname === link.link ? "page" : undefined
                }
              >
                <span className="me-2">{link.icon}</span>
                {link.title}
              </Link>
            </li>
          );
        })}
        <li className="nav-item" key="logout">
          <button className="nav-link link-dark" onClick={handleLogoutClick}>
            Logout
          </button>
        </li>
      </ul>
    );
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 bg-light"
      style={{ width: "280px" }}
    >
      <Link
        to="/"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
      >
        <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-4">
          <BiSync />
          Sync
        </span>
      </Link>
      <hr />
      {getSidebarLinks()}
      <hr />
    </div>
  );
};

export default Sidebar;
