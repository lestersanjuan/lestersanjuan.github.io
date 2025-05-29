import React, { useState, useEffect } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import "./Report.css";

function Report(props) {
  const [formValues, setFormValues] = useState({
    shiftLeads: "",
    generalNotes: "",
    late: "",
    employeePerformance: "",
    refills: "",
    customerComments: "",
    previousShiftNotes: "",
  });
  const [localStorage, setLocalStorage] = useState({});
  const [previousDate, setPreviousDate] = useState(props.date);

  //Handles changes  on props or when the user changes the date
  useEffect(() => {
    if (props.date !== previousDate) {
      const temp = props.date;
      if (temp in localStorage) {
        setFormValues(localStorage[temp]);
      } else {
        setFormValues({
          shiftLeads: "",
          generalNotes: "",
          late: "",
          employeePerformance: "",
          refills: "",
          customerComments: "",
          previousShiftNotes: "",
        });
      }
    }
  }, [props]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    console.log(value);
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setLocalStorage((prevLocalStorage) => ({
      ...prevLocalStorage,
      [props.date]: formValues,
    }));
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setLocalStorage((prevLocalStorage) => ({
      ...prevLocalStorage,
      [props.date]: formValues,
    }));
  };
  return (
    <div>
      <span>
        <h3 className="top">Store Operations:</h3>
        <div className="top items">
          <FormControlLabel
            control={<Checkbox defaultChecked className="customCheckbox" />}
            label="Tea Quality"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked className="customCheckbox" />}
            label="Boba Quality"
          />
          <FormControlLabel
            control={<Checkbox defaultChecked className="customCheckbox" />}
            label="Weekly Announcements spoke with Team"
          />
        </div>
        <div className="content">
          <div className="general-notes">
            <h2>General Notes</h2>
            <div className="text-area-notes">
              <label>
                Shift Leads and Supervisors
                <textarea
                  name="shiftLeads"
                  rows={2}
                  cols={40}
                  placeholder="Shift Leads/Soup"
                  value={formValues.shiftLeads}
                  onChange={handleChange}
                />
              </label>
              <label>
                General Notes
                <textarea
                  name="generalNotes"
                  rows={10}
                  cols={40}
                  placeholder="General Notes"
                  value={formValues.generalNotes}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="employee-performance">
            <h2>Employee Performance</h2>
            <label>
              <textarea
                name="late"
                rows={2}
                cols={40}
                placeholder="Anyone Late? __ Minutes"
                value={formValues.late}
                onChange={handleChange}
              />
            </label>
            <label>
              <textarea
                name="employeePerformance"
                rows={2}
                cols={40}
                placeholder="Employees Performance"
                value={formValues.employeePerformance}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="previous-shift">
            <h2>Previous Shifts</h2>
            <label>
              <textarea
                name="refills"
                rows={2}
                cols={40}
                placeholder="Refills Done? Previous Supervisor?"
                value={formValues.refills}
                onChange={handleChange}
              />
            </label>
            <label>
              <textarea
                name="previousShiftNotes"
                rows={2}
                cols={40}
                placeholder="Previous Shift Notes"
                value={formValues.previousShiftNotes}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="customer-comments">
            <h2>Customer Comments</h2>
            <label>
              <textarea
                name="customerComments"
                rows={2}
                cols={40}
                placeholder="Customer Comments"
                value={formValues.customerComments}
                onChange={handleChange}
              />
            </label>
          </div>
        </div>
      </span>
      <div className="button-container">
        <button onClick={handleSave} className="save">
          Save
        </button>
      </div>
    </div>
  );
}

export default Report;
