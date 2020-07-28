import React from 'react'
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Routes from './Routes';
import history from '../../history'

const Navbar = () => {
  return(
    <Router history={history}>
      <div>
        
        <Link to="/home">Home</Link>
        <Link to="/login">ログイン</Link>
        <Link to="/register">新規登録</Link>
        <Link to="/profile">プロフィール</Link>

        <Routes />
      </div>
    </Router>
  )
}

export default Navbar