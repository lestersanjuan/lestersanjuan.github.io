import React from "react";
import NavBar from "./components/NavBar/NavBar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DailyReport from "./components/DailyReport/DailyReport";
import Inventory from "./components/Inventory/Inventory";
import Assessment from "./components/Assessment/Assessment";
import Schedule from "./components/Schedule/Schedule";
import Daily from "./components/DailyReport1/DailyReport1";
import Home from "./components/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import OfficeRun from "./components/OfficeRun/OfficeRun";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar />
        <div id="contents">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Schedule" element={<Schedule />} />
            <Route path="/DailyReport" element={<DailyReport />} />
            <Route path="/Inventory" element={<Inventory />} />
            <Route path="/NavBar" element={<DailyReport />} />
            <Route path="/Assessment" element={<Assessment />} />
            <Route path="/Daily" element={<Daily />} />
            <Route path="/OfficeRun" element={<OfficeRun />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
