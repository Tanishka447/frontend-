import React from 'react';
import './App.css';
import RegistrationForm from './components/auth/register.js';
import Login from './components/auth/login.js';
import Navbar from './components/auth/buttons.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/auth/home.js';
import User from './components/auth/user.js'
import ExpenseAPI from './components/EXPENSES/ExpenseAPI.js';
import CategoryAPI from './components/categories/CategoryAPI.js';
import ReportsAPI from './components/Reports/ReportsAPI.js';
import DashboardAPI from './components/dashboard/DashboardAPI.js';

// import DashboardAPI from '../src/components/dashboard/DashboardAPI.js';
// import {Link} from 'react-router-dom';


function App () {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <><Navbar/><Home/></>
    },
    {
      path:"/register",
      element : <><RegistrationForm/></>
    },
    {
        path :"/login",
        element : <><Login/></>
    },
    {
      path :"/Dashboard",
      element: <DashboardAPI/>
    },
    {
      path: "/user",
      element: <><Navbar /><User /></>
    },
    {
      path: "/Expenses",
      element: <ExpenseAPI/>
    },
  {
    path:"/Categories",
    element:<CategoryAPI/>
  },
  {
    path:"/Reports",
    element:<ReportsAPI/>
  },
  ])
  return (
  <>
  <RouterProvider router={router}/>
  </>
  )
}
  
export default App