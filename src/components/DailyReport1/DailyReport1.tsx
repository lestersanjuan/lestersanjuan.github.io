import React, { useState } from "react";
import "./DailyReport1.css";
import Report from "./Report";

function Daily() {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="container">
      <div className="box" id="heading">
        <h1>Daily Report</h1>
      </div>
      <div className="box" id="date">
        <h3>Date</h3>
        <input
          type="date"
          id="date-input"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="box report" id="day-shift">
        <h2>Day shift</h2>
        <div className="report-styling">
          <Report date={selectedDate} />
        </div>
      </div>
      <div className="box report" id="night-shift">
        <h2>Night shift</h2>
        <div className="report-styling">
          <Report date={selectedDate} />
        </div>
      </div>
    </div>
  );
}

export default Daily;
