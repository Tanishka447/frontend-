import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    
  return (
    <div>
      <nav>
        <NavLink className={(e)=>{ }} to="/"><li>EXPENSE-TRACKER WEB APP</li></NavLink>
        <NavLink className={(e)=>{ }} to="/register"><li></li></NavLink>
        <NavLink className={(e)=>{ }} to="/login"><li></li></NavLink>
      </nav>
    </div>
  )
}

export default Navbar;  