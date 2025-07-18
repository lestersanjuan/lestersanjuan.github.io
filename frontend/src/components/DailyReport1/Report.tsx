import React, { useState, useEffect } from "react";
import { FormControlLabel, Checkbox } from "@mui/material";
import "./Report.css";
import api from "../../tools/api.js";

interface User {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  role: string;
}
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
  const [leadsList, setLeadsList] = useState<User[]>([]);
  const [employeeList, setEmployeeList] = useState<
    Array<{ id: string; name: string }>
  >([]);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);

  useEffect(() => {
    getFormValues();
    // fetch supervisors:
    api.get<User[]>("/api/supervisors/").then((res) => {
      setLeadsList(res.data);
    });

    // fetch employees:
    api.get<User[]>("/api/employees/").then((res) => setEmployeeList(res.data));
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

  const handleAddLead = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (id && !selectedLeads.includes(id)) {
      setSelectedLeads([...selectedLeads, id]);
    }
    e.target.value = "";
  };

  const handleRemoveLead = (id: string) => {
    setSelectedLeads(selectedLeads.filter((x) => x !== id));
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
                <select defaultValue="" onChange={handleAddLead}>
                  <option value="" disabled>
                    Select supervisor…
                  </option>
                  {leadsList.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.full_name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="selected-tags">
                {selectedLeads.map((id) => {
                  const user = leadsList.find((u) => u.id === id);
                  return (
                    <span key={id} className="tag">
                      {user?.full_name ?? id}
                      <button
                        type="button"
                        className="remove-tag"
                        onClick={() => handleRemoveLead(id)}
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
              </div>
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
