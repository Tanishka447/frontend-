import React, { useState } from 'react';
import './Reports.css'; 

const ReportsAPI = () => {
  const [selectedMonth, setSelectedMonth] = useState(''); 
  const [selectedYear, setSelectedYear] = useState(''); 
  const [startDate, setStartDate] = useState(''); 
  const [endDate, setEndDate] = useState(''); 

  const handleGenerateMonthlyReport = () => {
    console.log('Generating Monthly Report for:', selectedMonth);
  };

  const handleGenerateYearlyReport = () => {
    console.log('Generating Yearly Report for:', selectedYear);
  };

  const handleGenerateRangeReport = () => {
    console.log('Generating Range Report from:', startDate, 'to:', endDate);
  };

  return (
    <div className="reports-page">
      <h1>Generate Reports</h1>

      {/* Monthly Report Section */}
      <div className="report-section">
        <h2>Monthly Report</h2>
        <div className="report-option">
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
        <button className="generate-report-button" onClick={handleGenerateMonthlyReport}>
          Generate Monthly Report
        </button>
      </div>

      {/* Yearly Report Section */}
      <div className="report-section">
        <h2>Yearly Report</h2>
        <div className="report-option">
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">Select Year</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            {/* Add more years as needed */}
          </select>
        </div>
        <button className="generate-report-button" onClick={handleGenerateYearlyReport}>
          Generate Yearly Report
        </button>
      </div>

      {/* Range Report Section */}
      <div className="report-section">
        <h2>Range Report</h2>
        <div className="date-range">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Start Date"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder="End Date"
          />
        </div>
        <button className="generate-report-button" onClick={handleGenerateRangeReport}>
          Generate Range Report
        </button>
      </div>
    </div>
  );
};

export default ReportsAPI;
