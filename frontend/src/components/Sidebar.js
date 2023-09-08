import React from "react";
import { BiCategory, BiNews, BiSync } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faTags,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Sidebar = ({ userRole, handleLogout }) => {
  const location = useLocation();
  const history = useHistory();

  const sidebarLinks = [];

  if (userRole === "SuperAdmin") {
    sidebarLinks.push(
      {
        title: "Categories",
        icon: <BiCategory size={16} />,
        link: "/dashboard/managecategories",
      },
      {
        title: "Language",
        icon: <FontAwesomeIcon icon={faLanguage} size={16} />,
        link: "#",
      },
      {
        title: "Tags",
        icon: <FontAwesomeIcon icon={faTags} size={16} />,
        link: "#",
      },
      {
        title: "News",
        icon: <BiNews size={16} />,
        link: "/dashboard/managenews",
      },
      {
        title: "User Management",
        icon: <FontAwesomeIcon icon={faUser} />,
        link: "/dashboard/manageusers",
      }
    );
  } else if (userRole === "Admin") {
    sidebarLinks.push(
      {
        title: "Categories",
        icon: <BiCategory size={16} />,
        link: "/dashboard/managecategories",
      },
      {
        title: "Language",
        icon: <FontAwesomeIcon icon={faLanguage} size={16} />,
        link: "#",
      },
      {
        title: "Tags",
        icon: <FontAwesomeIcon icon={faTags} size={16} />,
        link: "#",
      },
      {
        title: "News",
        icon: <BiNews size={16} />,
        link: "/dashboard/managenews",
      }
    );
  } else if (userRole === "NewsEntry") {
    sidebarLinks.push({
      title: "Add News",
      icon: <BiNews size={16} />,
      link: "/dashboard/addnews",
    });
  }

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");

    history.push("/");
  };

  const getSidebarLinks = () => {
    return (
      <ul className="nav flex-column mb-auto">
        {sidebarLinks.map((link) => {
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
            <FontAwesomeIcon icon={faSignOutAlt} size={16} /> Logout
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
      <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap" />
        </svg>
        <span className="fs-4" style={{ cursor: "pointer" }}>
          <BiSync />
          Sync
        </span>
      </div>
      <hr />
      {getSidebarLinks()}
      <hr />
    </div>
  );
};

export default Sidebar;
