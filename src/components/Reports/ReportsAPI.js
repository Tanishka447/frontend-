

import React, { useState } from 'react';
import axios from 'axios';

function ReportsAPI() {
  // State for Monthly Report
  const [yearMonthly, setYearMonthly] = useState('');
  const [month, setMonth] = useState('');
  const [monthlyExpenditure, setMonthlyExpenditure] = useState(null);
  const [errorMonthly, setErrorMonthly] = useState(null);

  // State for Yearly Report
  const [selectedYear, setSelectedYear] = useState('');
  const [yearlyReport, setYearlyReport] = useState([]);
  const [errorYearly, setErrorYearly] = useState(null);

  // State for Date Range Report
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateRangeReports, setDateRangeReports] = useState([]);
  const [errorDateRange, setErrorDateRange] = useState(null);

  // Token for Authorization
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAzLCJpYXQiOjE3MjI1MDc0NDIsImV4cCI6MTczOTc4NzQ0Mn0.ToWGF8L7O8otT7r1INZCiAun7MTp7_0BZjVeegSBm10'; // Replace with actual token retrieval logic

  // Handler for Monthly Report
  const handleGenerateMonthlyReport = async () => {
    console.log('Generating Monthly Report for:', yearMonthly, month);
    try {
      const response = await axios.get(`http://localhost:9001/getallreports/${yearMonthly}/${month}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setMonthlyExpenditure(response.data.monthly_expenditure);
      setErrorMonthly(null); // Clear any previous errors
    } catch (error) {
      console.error('Error generating monthly report:', error);
      setErrorMonthly('Failed to fetch monthly report. Please try again.');
    }
  };

  // Handler for Yearly Report
  const handleGenerateYearlyReport = async () => {
    console.log('Generating Yearly Report for:', selectedYear);
    try {
      const response = await axios.get(`http://localhost:9001/Yearly/${selectedYear}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setYearlyReport(response.data);
      setErrorYearly(null); 
    } catch (error) {
      console.error('Error generating yearly report:', error);
      setErrorYearly('Failed to fetch yearly report. Please try again.');
    }
  };


  const handleGenerateDateRangeReport = async () => {
    console.log('Generating Date Range Report from:', startDate, 'to', endDate);
    try {
      const response = await axios.post('http://localhost:9001/rangereport', {
        startDate,
        endDate
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setDateRangeReports(response.data);
      setErrorDateRange(null); 
    } catch (error) {
      console.error('Error generating date range report:', error);
      setErrorDateRange('Failed to fetch date range report. Please try again.');
    }
  };

  return (
    <div>
      {}
      <div>
        <h2>Monthly Report</h2>
        <label>Select Year: </label>
        <input
          type="text"
          value={yearMonthly}
          onChange={(e) => setYearMonthly(e.target.value)}
          placeholder="Enter year"
        />
        <label>Select Month: </label>
        <input
          type="text"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Enter month (1-12)"
        />
        <button onClick={handleGenerateMonthlyReport}>Generate Monthly Report</button>
        {errorMonthly && <p style={{ color: 'red' }}>{errorMonthly}</p>}
        {monthlyExpenditure !== null && (
          <div>
            <h3>Monthly Expenditure:</h3>
            <p>${monthlyExpenditure.toFixed(2)}</p>
          </div>
        )}
      </div>

      {/* Yearly Report */}
      <div>
        <h2>Yearly Report</h2>
        <label>Select Year: </label>
        <input
          type="text"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          placeholder="Enter year"
        />
        <button onClick={handleGenerateYearlyReport}>Generate Yearly Report</button>
        {errorYearly && <p style={{ color: 'red' }}>{errorYearly}</p>}
        <div>
          <h3>Yearly Report:</h3>
          {yearlyReport.length === 0 ? (
            <p>No report available for the selected year.</p>
          ) : (
            <ul>
              {yearlyReport.map((report, index) => (
                <li key={index}>
                  {`ID: ${report.id}, Expenditure Amount: ${report.expenditure_amount}`} 
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Date Range Report */}
      <div>
        <h2>Date Range Report</h2>
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleGenerateDateRangeReport}>Generate Date Range Report</button>
        {errorDateRange && <p style={{ color: 'red' }}>{errorDateRange}</p>}
        <div>
          <h3>Date Range Report:</h3>
          {dateRangeReports.length === 0 ? (
            <p>No reports available for the selected date range.</p>
          ) : (
            <ul>
              {dateRangeReports.map((report, index) => (
                <li key={index}>
                  {`ID: ${report.id}, Expenditure Amount: ${report.expenditure_amount}`} {/* Adjust based on your report fields */}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReportsAPI;
