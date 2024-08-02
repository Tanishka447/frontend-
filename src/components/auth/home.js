import React from 'react'
import { Link } from 'react-router-dom';

const home = () => {

  const homeStyle = {
    backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1670213989466-3c4bb75cf5ad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxleHBlbnNlJTIwdHJhY2tlciUyMGltYWdlfGVufDB8fDB8fHww)', // Replace with your image URL
    backgroundSize: 'cover', // Ensures the image covers the entire background
    backgroundPosition: 'center', // Centers the image
    backgroundRepeat: 'no-repeat', 
    height: '90vh', 
    color: '#fff', 
    textAlign: 'center', // Centers text horizontally
    padding: '20px' 
  };

  const h2Style = {
    color: 'maroon', 
    fontSize: '3rem', 
    margin: '0', 
    padding: '20px' 
  };

  const liStyle = {
    fontSize: '4em', // Adjust the size as needed
    marginBottom: '10px', // Optional: add some spacing between items
  };
  
  const linkStyle = {
    textDecoration: 'none', // Optional: remove underline from links
    color: 'black', // Optional: inherit color from parent
  };

  return (
    <div style={homeStyle}> 
     <h2  style={h2Style}>Keep track of your money</h2>
     <div className="options">
        <ul>
          <li  style={liStyle}><Link to="/dashboard" style={linkStyle} className="nav-link">Dashboard</Link></li>
          <li  style={liStyle}><Link to="/expenses" style={linkStyle} className="nav-link">Expenses</Link></li>
          <li  style={liStyle}><Link to="/categories" style={linkStyle} className="nav-link">Categories</Link></li>
          <li  style={liStyle}><Link to="/reports" style={linkStyle} className="nav-link">Reports</Link></li>
          
        </ul>
      </div>
    </div>
  )
}


export default home

