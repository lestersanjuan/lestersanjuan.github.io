import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "./DailyReport.css";

interface FormValues {
  teaQuality: boolean;
  bobaQuality: boolean;
  weeklyLeadership: boolean;
  shiftLeadsSoups: string;
  generalNotes: string;
  anyoneLate: string;
  employeePerformance: string;
  previousSupervisor: string;
  previousShiftNotes: string;
  customerComments: string;
}

interface Reports {
  [key: string]: FormValues;
}

const initialFormValues: FormValues = {
  teaQuality: false,
  bobaQuality: false,
  weeklyLeadership: false,
  shiftLeadsSoups: "",
  generalNotes: "",
  anyoneLate: "",
  employeePerformance: "",
  previousSupervisor: "",
  previousShiftNotes: "",
  customerComments: "",
};

function DailyReport1(): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [reports, setReports] = useState<Reports>({});

  const handleDateChange = (newValue: Dayjs | null): void => {
    setSelectedDate(newValue);
    if (newValue) {
      const dateKey = newValue.format("YYYY-MM-DD");
      if (reports[dateKey]) {
        setFormValues(reports[dateKey]);
      } else {
        setFormValues(initialFormValues);
      }
    } else {
      setFormValues(initialFormValues);
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveValue = (): void => {
    if (!selectedDate) {
      alert("Please select a date first");
      return;
    }
    const dateKey = selectedDate.format("YYYY-MM-DD");
    setReports((prevReports) => ({
      ...prevReports,
      [dateKey]: formValues,
    }));
    console.log("Saved report for", dateKey, formValues);
  };

  return (
    <Paper className="daily-report">
      <Typography variant="h4" align="center" gutterBottom>
        Daily Report
      </Typography>

      {/* Store Operations Section */}
      <div className="section">
        <Typography variant="h6" gutterBottom className="section-heading">
          Store Operations
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                views={["year", "month", "day"]}
                value={selectedDate}
                onChange={handleDateChange}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues.teaQuality}
                  onChange={handleCheckboxChange}
                  name="teaQuality"
                />
              }
              label="Tea Quality Check"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues.bobaQuality}
                  onChange={handleCheckboxChange}
                  name="bobaQuality"
                />
              }
              label="Boba Quality Check"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formValues.weeklyLeadership}
                  onChange={handleCheckboxChange}
                  name="weeklyLeadership"
                />
              }
              label="Weekly Leadership notes communicated with team"
            />
          </Grid>
        </Grid>
      </div>

      {/* General Notes Section */}
      <div className="section">
        <Typography variant="h6" gutterBottom className="section-heading">
          General Notes
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="shiftLeadsSoups"
              label="Shift Leads/Soups"
              multiline
              fullWidth
              value={formValues.shiftLeadsSoups}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="generalNotes"
              label="General Notes"
              multiline
              rows={4}
              fullWidth
              value={formValues.generalNotes}
              onChange={handleTextChange}
            />
          </Grid>
        </Grid>
      </div>

      {/* Employee Performance Section */}
      <div className="section">
        <Typography variant="h6" gutterBottom className="section-heading">
          Employee Performance
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="anyoneLate"
              label="Anyone Late? ___Minutes"
              multiline
              fullWidth
              value={formValues.anyoneLate}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="employeePerformance"
              label="Employee Performance"
              multiline
              fullWidth
              rows={4}
              value={formValues.employeePerformance}
              onChange={handleTextChange}
            />
          </Grid>
        </Grid>
      </div>

      {/* Previous Shift Lead/Soup Comments Section */}
      <div className="section">
        <Typography variant="h6" gutterBottom className="section-heading">
          Previous Shift Lead/Soup Comments
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              name="previousSupervisor"
              label="Refills Done? Previous Supervisor?"
              multiline
              fullWidth
              value={formValues.previousSupervisor}
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="previousShiftNotes"
              label="Previous Shift Notes"
              multiline
              fullWidth
              rows={4}
              value={formValues.previousShiftNotes}
              onChange={handleTextChange}
            />
          </Grid>
        </Grid>
      </div>

      {/* Customer Comments Section */}
      <div className="section">
        <Typography variant="h6" gutterBottom className="section-heading">
          Customer Comments
        </Typography>
        <TextField
          name="customerComments"
          label="Comments and if was solved?"
          multiline
          fullWidth
          value={formValues.customerComments}
          onChange={handleTextChange}
        />
      </div>

      {/* Save Button */}
      <div className="save-button-container">
        <Button variant="contained" onClick={saveValue}>
          Save
        </Button>
      </div>
    </Paper>
  );
}

export default DailyReport1;
