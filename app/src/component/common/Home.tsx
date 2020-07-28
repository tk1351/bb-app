import React from 'react'
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Routes from './Routes';
import history from '../../history'

const Home = () => {
  const user = localStorage.getItem('username')

  return(
    <Router history={history}>

      <div>
        <p>Home</p>
        <p>ようこそ{user}さん</p>

        <button>
          <Link to="/submit">投稿する</Link>
        </button>
      </div>
    </Router>

    
  )
}

export default Home