import React, { useState, useEffect } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import "./Report.css";
import api from "../../tools/api.js";

interface FormValues {
  shiftLeads: string;
  generalNotes: string;
  late: string;
  employeePerformance: string;
  refills: string;
  customerComments: string;
  previousShiftNotes: string;
}

interface LocalStorage {
  [key: string]: FormValues;
}

interface ReportProps {
  date: string;
  day: "day" | "night";
}
const initialFormValues: FormValues = {
  shiftLeads: "",
  generalNotes: "",
  late: "",
  employeePerformance: "",
  refills: "",
  customerComments: "",
  previousShiftNotes: "",
};

function Report({ date, day }: ReportProps): JSX.Element {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [leadsList, setLeadsList] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [selectedLeads, setSelectedLeads] = useState<typeof leadsList>([]);

  useEffect(() => {
    getFormValues();
  }, []);
  const getFormValues = () => {
    api
      .get(`http://127.0.0.1:8000/api/dailyreport/${date}/`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data, "This is the data");
        if (day === "day") {
          setFormValues({
            shiftLeads: "",
            generalNotes: data.general_notes_d,
            late: "",
            employeePerformance: "",
            refills: "",
            customerComments: "",
            previousShiftNotes: "",
          });
        } else {
          setFormValues({
            shiftLeads: "",
            generalNotes: data.general_notes_n,
            late: "",
            employeePerformance: "",
            refills: "",
            customerComments: "",
            previousShiftNotes: "",
          });
        }
      });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setStorageData((prev) => ({
      ...prev,
      [date]: {
        ...formValues,
        [name]: value,
      },
    }));
  };

  const handleSave = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setStorageData((prev) => ({
      ...prev,
      [date]: formValues,
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
                <select
                  name="shiftLeads"
                  value={formValues.shiftLeads}
                  onChange={(e) =>
                    setFormValues((fv) => ({
                      ...fv,
                      shiftLeads: e.target.value,
                    }))
                  }
                >
                  <option value="">(choose shift lead)</option>
                  {soupDayList.map((user) => (
                    <option key={user.id} value={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <div>General Notes</div>
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
