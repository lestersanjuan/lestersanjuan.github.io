import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWarehouse,
  faCalendar,
  faNewspaper,
  faRunning,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import "./Sidebar.css";
export default function Sidebar() {
  console.log("meow");
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
                size="2xl"
                className="FontAwesome"
              />
              <span className="link-text">EOW Inventory</span>
            </a>
          </li>
          <li className="side-item">
            <a href="/Daily" className="side-link">
              <FontAwesomeIcon
                icon={faCalendar}
                size="2xl"
                className="FontAwesome"
              />
              <span className="link-text">Daily Report</span>
            </a>
          </li>
          <li className="side-item">
            <a href="/Schedule" className="side-link">
              <FontAwesomeIcon
                icon={faNewspaper}
                size="2xl"
                className="FontAwesome"
              />
              <span className="link-text">Schedule</span>
            </a>
          </li>
          <li className="side-item">
            <a href="/OfficeRun" className="side-link">
              <FontAwesomeIcon
                icon={faRunning}
                size="2xl"
                className="FontAwesome"
              />
              <span className="link-text">Office Run</span>
            </a>
          </li>
          <li className="side-item maow">
            <a href="/OfficeRun" className="side-link maow" id="bruh">
              <FontAwesomeIcon
                icon={faGear}
                size="2xl"
                className="FontAwesome bruh"
              />
              <span className="link-text">Setting</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
