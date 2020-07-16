import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Routes from './Routes';

const Navbar = () => {
  return(
    <Router>
      <div>
        
        <Link to="/home">Home</Link>
        <Link to="/login">ログイン</Link>
        <Link to="/register">新規登録</Link>

        <Routes />
      </div>
    </Router>
  )
}

export default Navbar