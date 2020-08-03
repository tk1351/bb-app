import React, { useState, useEffect } from 'react'
import { Router, Link, Route } from "react-router-dom";
import history from '../../history'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import TimeLine from '../TimeLine';
import Container from '@material-ui/core/Container';
import { UserDetailInfo } from '../../module/auth/register';
import axios from 'axios'
import Profile from '../auth/Profile';
import UserDetail from '../UserDetail';

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
  const [list, setList] = useState<UserDetailInfo[]>(initialValue)

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
  const historyPush = (user: UserDetailInfo) => {
      history.push({
        pathname: '/user/' + user._id,
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
        <p>ようこそ{user}さん</p>

        <p>ユーザーリスト</p>
        {list.map(user => 
          <ul key={user._id}>
            <Route path='/user/:id' component={UserDetail} />
            <a onClick={() => historyPush(user)}>{user.username}</a>
          </ul>
        )}

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