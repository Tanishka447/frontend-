import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import RegistrationForm from './components/auth/register.js';
import Navbar from './components/auth/buttons.js';
import { createBrowserRouter, RouterProvider,Navigate } from 'react-router-dom';
import Home from './components/auth/home.js';
import User from './components/auth/user.js'
import ExpenseAPI from './components/EXPENSES/ExpenseAPI.js';
import CategoryAPI from './components/categories/CategoryAPI.js';
import ReportsAPI from './components/Reports/ReportsAPI.js';
import DashboardAPI from './components/dashboard/DashboardAPI.js';
import LoginForm from './components/auth/login.js';
import { ExpenseProvider } from './components/expensecontext.js';

// import DashboardAPI from '../src/components/dashboard/DashboardAPI.js';
// import {Link} from 'react-router-dom';
const RegistrationRedirect = () => <Navigate to="/register" />;
const LoginRedirect = () => <Navigate to="/login" />;
const HomeRedirect = () => <Navigate to="/" />;

ReactDOM.render(
  <ExpenseProvider>
    <App />
  </ExpenseProvider>,
  document.getElementById('root')
);


function App () {
  const router = createBrowserRouter([
    {
      path:"/",
      element :<><RegistrationForm/></>
    },
    {
      path :"/login",
        element : <><LoginForm/></>
    },
    {
        path : "/home",
        element : <><Navbar/><Home/></>
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
  {
    path: "/",
    element: <RegistrationRedirect />, // Redirects to /register
  },
  {
    path: "/register/success",
    element: <LoginRedirect />, // Redirects to /login after successful registration
  },
  {
    path: "/login/success",
    element: <HomeRedirect />, // Redirects to / after successful login
  },
  ])
  return (
  <>
  <RouterProvider router={router}/>
  </>
  )
}
  
export default App