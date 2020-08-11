import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './Home';
import Profile from '../user/Profile'
import PostArticle from '../form/PostArticle';
import ArticleDetail from '../article/ArticleDetail';
import UserDetail from '../user/UserDetail';

const Routes = () => {
  return(
      <div>
        {/* Homeへのリダイレクト */}
        {/* <Redirect to="/home" /> */}
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/user/:id" component={UserDetail} />
          <Route path="/submit" component={PostArticle} />
          <Route path="/detail/:id" component={ArticleDetail} />
        </Switch>
      </div>
  )
}

export default Routes