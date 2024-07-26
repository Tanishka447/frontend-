import React, { useState, useEffect } from 'react';
import './dashboardAPI.css'; 
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardAPI = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBalance, setRemainingBalance] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      await fetchTotalIncome();
      await fetchTotalExpenses();
      calculateRemainingBalance();
    };

    fetchData();
  }, [totalIncome, totalExpenses]); 

  const fetchTotalIncome = async () => {
    try {
      const response = await axios.get('http://localhost:9001/totalIncome');
      setTotalIncome(response.data.totalIncome);
    } catch (error) {
      console.error('Error fetching total income:', error);
    }
  };

  const fetchTotalExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:9001/totalExpenses');
      setTotalExpenses(response.data.totalExpenses);
    } catch (error) {
      console.error('Error fetching total expenses:', error);
    }
  };

  const calculateRemainingBalance = () => {
    const remaining = totalIncome - totalExpenses;
    setRemainingBalance(remaining);
  };
  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {  label: 'Financial Overview',
        data: [totalIncome, totalExpenses],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income vs Expenses',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-column">
        <h2>Total Income</h2>
        <div className="dashboard-value">${totalIncome}</div>
      </div>
      <div className="dashboard-column">
        <h2>Total Expenses</h2>
        <div className="dashboard-value">${totalExpenses}</div>
      </div>
      <div className="dashboard-column">
        <h2>Remaining Balance</h2>
        <div className="dashboard-value">${remainingBalance}</div>
      </div>
      <div className="dashboard-chart">
        <h2>Financial Overview Chart</h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DashboardAPI;
