import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Routes from './Routes';
import { userInfo } from 'os';

const Navbar = () => {
  return(
    <Router>
      <div>
        
        <Link to="/home">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>

        <Routes />
      </div>
    </Router>
  )
}

export default Navbar