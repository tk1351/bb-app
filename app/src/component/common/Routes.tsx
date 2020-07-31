import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Login from '../auth/Login';
import Register from '../auth/Register';
import Home from './Home';
import Profile from '../auth/Profile'
import SubmitBestBuy from '../form/PostBestBuy';

const Routes = () => {
  return(
      <div>
        {/* Homeへのリダイレクト */}
        {/* <Redirect to="/home" /> */}
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/submit">
            <SubmitBestBuy />
          </Route>
        </Switch>
      </div>
  )
}

export default Routes