// src/Dashboard.js
import React from 'react';
import './dashboardAPI.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Visually Appear Your Expenses</h1>
      <div className="info-boxes">
        <div className="info-box">
          <h3>Total Income</h3>
          <p>$5,000</p>
        </div>
        <div className="info-box">
          <h3>Total Expenses</h3>
          <p>$3,500</p>
        </div>
        <div className="info-box">
          <h3>Remaining Balance</h3>
          <p>$1,500</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
