import React, { useState, useEffect } from 'react'
import { Router, Link, Route } from "react-router-dom";
import history from '../../history'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import TimeLine from '../TimeLine';
import Container from '@material-ui/core/Container';
import { UserDetail } from '../../module/auth/register';
import axios from 'axios'
import Profile from '../auth/Profile';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const initialValue = [{
  _id: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
}]

const Home = () => {
  const [list, setList] = useState<UserDetail[]>(initialValue)

  useEffect(() => {
    getUser()
  },[])

  const getUser = async () => {
    const url = '/api/v1/users'
  
    try {
      await axios.get(url)
        .then((res) => {
          setList(res.data)
        })
    } catch(error) {
      console.error(error)
    }
  } 

  //MongoDBのIDを渡す
  const historyPush = (user: UserDetail) => {
      history.push({
        pathname: '/profile/' + user._id,
        state: {user} 
    })
  }
  
  const postBestBuy = () => {
    history.push('/submit')
  }

  const user = localStorage.getItem('username')
  const classes = useStyles();

  return(
    <Router history={history}>
      <Container component="main" maxWidth="xs">
        <p>Home</p>
        <p>ようこそ{user}さん</p>

        {/* {list.map(user => 
          <li key={user._id}>
            <Route path='/profile/:id' component={Profile} />
            <span onClick={() => historyPush(user)}>{user.username}</span>
          </li>
        )} */}

        <Button 
          variant="contained" 
          color="primary"
          className={classes.button} 
          endIcon={<Icon>send</Icon>}
          onClick={postBestBuy}
        >
          投稿する
        </Button>
        <TimeLine />
      </Container>
    </Router>
  )
}

export default Home