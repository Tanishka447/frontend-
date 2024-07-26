import React from 'react'
import { Link } from 'react-router-dom';

const home = () => {
  return (
    <div className='home-container'> 
     <h2>Keep track of your money</h2>
     <div className="options">
        <ul>
          <li><Link to="/dashboard" className="nav-link">Dashboard</Link></li>
          <li><Link to="/expenses" className="nav-link">Expenses</Link></li>
          <li><Link to="/categories" className="nav-link">Categories</Link></li>
          <li><Link to="/reports" className="nav-link">Reports</Link></li>
          
        </ul>
      </div>
    </div>
  )
}


export default home
