import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faCalendar,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

import "./Sidebar.css";
export default function Sidebar() {
  return (
    <>
      <nav className="sidebar">
        <ul className="sidebar-side">
          <li className="side-item">
            <a href="/" className="side-link">
              <span className="link-text">Home</span>
            </a>
            <a href="Inventory" className="side-link">
              <FontAwesomeIcon
                icon={faWarehouse}
                size="xl"
                className="FontAwesome"
              />
              <span className="link-text">EOW Inventory</span>
            </a>
          </li>
          <li className="side-item">
            <a href="/Daily" className="side-link">
              <FontAwesomeIcon
                icon={faCalendar}
                size="xl"
                className="FontAwesome"
              />
              <span className="link-text">Daily Report</span>
            </a>
          </li>
          <li className="side-item">
            <a href="/Schedule" className="side-link">
              <FontAwesomeIcon
                icon={faNewspaper}
                size="xl"
                className="FontAwesome"
              />
              <span className="link-text">Schedule</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
