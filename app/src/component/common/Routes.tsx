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
import EditArticle from '../form/EditArticle';
import CategoryPage from '../article/CategoryPage';

const Routes = () => {
  return(
      <div>
        {/* <Redirect to="/home" /> */}
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/submit" component={PostArticle} />
          <Route path="/detail/:id" component={ArticleDetail} />
          <Route path="/edit/:id" component={EditArticle} />
          <Route path="/category/:id" component={CategoryPage} />
        </Switch>
      </div>
  )
}

export default Routes