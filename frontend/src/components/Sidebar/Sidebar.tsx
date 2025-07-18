import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faCalendar,
  faNewspaper,
  faRunning,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../tools/constants";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    // api.defaults.headers.common["Authorization"] = null; // if used
    navigate("/login");
  };

  return (
    <nav className="sidebar">
      <ul className="sidebar-side">
        <li className="side-item">
          <Link to="/" className="side-link">
            <span className="link-text">Home</span>
          </Link>
        </li>

        <li className="side-item">
          <Link to="/Inventory" className="side-link">
            <FontAwesomeIcon
              icon={faWarehouse}
              size="2xl"
              className="FontAwesome"
            />
            <span className="link-text">EOW Inventory</span>
          </Link>
        </li>

        <li className="side-item">
          <Link to="/Daily" className="side-link">
            <FontAwesomeIcon
              icon={faCalendar}
              size="2xl"
              className="FontAwesome"
            />
            <span className="link-text">Daily Report</span>
          </Link>
        </li>

        <li className="side-item">
          <Link to="/Schedule" className="side-link">
            <FontAwesomeIcon
              icon={faNewspaper}
              size="2xl"
              className="FontAwesome"
            />
            <span className="link-text">Schedule</span>
          </Link>
        </li>

        <li className="side-item">
          <Link to="/OfficeRun" className="side-link">
            <FontAwesomeIcon
              icon={faRunning}
              size="2xl"
              className="FontAwesome"
            />
            <span className="link-text">Office Run</span>
          </Link>
        </li>

        <li className="side-item">
          <button
            type="button"
            onClick={handleLogout}
            className="side-link side-button-reset"
          >
            <FontAwesomeIcon icon={faGear} size="2xl" className="FontAwesome" />
            <span className="link-text">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
