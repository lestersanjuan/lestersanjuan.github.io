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
  const [employeeList, setEmployeeList] = useState<User[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [performanceDesc, setPerformanceDesc] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    getFormValues();
    // fetch supervisors:
    api.get<User[]>("/api/supervisors/").then((res) => {
      setLeadsList(res.data);
    });
    api.get<User[]>("/api/employees/").then((res) => setEmployeeList(res.data));
  }, [date]);
  const getFormValues = async () => {
    try {
      // await the result so that errors throw into our catch block
      const res = await api.get(`/api/dailyreport/${date}/`);
      const data = res.data;

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
    } catch (err) {
      setFormValues(initialFormValues);
    }
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

  const handleAddEmployee = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (id && !selectedEmployees.includes(id)) {
      setSelectedEmployees([...selectedEmployees, id]);
    }
    e.target.value = "";
  };
  const handleRemoveEmployee = (id: string) => {
    setSelectedEmployees(selectedEmployees.filter((x) => x !== id));
  };
  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const empPerfArray = selectedEmployees.map((id) => ({
      employee: id,
      performance_text: performanceDesc[id] || "",
    }));
    const payload = {
      supervisor_d: selectedLeads,
      general_notes_d: formValues.generalNotes,
      late_d: formValues.late,
      employee_perf_d: empPerfArray,
      refills_d: formValues.refills,
      customer_comments_d: formValues.customerComments,
      previous_shift_d: formValues.previousShiftNotes,

      supervisor_n: [],
      general_notes_n: "",
      late_n: "",
      employee_perf_n: [],
      refills_n: "",
      customer_comments_n: "",
      previous_shift_n: "",
    };

    try {
      const res = await api.post(`/api/dailyreport/upsert/${date}/`, payload);
      alert("Saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
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
                        X
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
              />
            </label>
            <label>
              <select defaultValue="" onChange={handleAddEmployee}>
                <option value="" disabled>
                  Select Employee
                </option>
                {employeeList.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.full_name}
                  </option>
                ))}
              </select>
            </label>
            <div className="selected-tags">
              {selectedEmployees.map((id) => {
                const user = employeeList.find((u) => u.id === id);
                return (
                  <span key={id} className="tag">
                    {user?.full_name ?? id}
                    <button
                      type="button"
                      onClick={() => handleRemoveEmployee(id)}
                    >
                      X
                    </button>
                    <textarea
                      name={id}
                      rows={2}
                      cols={40}
                      placeholder="How did this employee do?"
                      value={performanceDesc[id] || ""}
                      onChange={(e) =>
                        setPerformanceDesc((prev) => ({
                          ...prev,
                          [id]: e.target.value,
                        }))
                      }
                    />
                  </span>
                );
              })}
            </div>
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
              />
            </label>
            <label>
              <textarea
                name="previousShiftNotes"
                rows={2}
                cols={40}
                placeholder="Previous Shift Notes"
                value={formValues.previousShiftNotes}
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
