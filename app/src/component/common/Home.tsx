import React, { useState, useEffect } from 'react';
import { Router, Link, Route } from 'react-router-dom';
import history from '../../history';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import TimeLine from '../TimeLine';
import Container from '@material-ui/core/Container';
import { UserDetailInfo } from '../../module/auth/register';
import axios from 'axios';
import UserDetail from '../UserDetail';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    root: {
      display: 'flex',
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
    },
  })
);

const initialValue = [
  {
    _id: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
];

const Home = () => {
  const [list, setList] = useState<UserDetailInfo[]>(initialValue);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const url = '/api/v1/users';

    try {
      await axios.get(url).then((res) => {
        setList(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  //MongoDBのIDを渡す
  const historyPush = (user: UserDetailInfo) => {
    history.push({
      pathname: '/user/' + user._id,
      state: { user },
    });
  };

  const postBestBuy = () => {
    history.push('/submit');
  };

  const { user } = useAuth0();
  // const user = localStorage.getItem('username')

  const usersList = list.map((user) => (
    <ul key={user._id}>
      <Route path='/user/:id' component={UserDetail} />
      <a onClick={() => historyPush(user)}>{user.username}</a>
    </ul>
  ));

  const classes = useStyles();

  return (
    <Router history={history}>
      <Container component='main' maxWidth='xs'>
        {/* <p>ようこそ{user.name}さん</p> */}

        {/* <p>ユーザーリスト</p>
        {usersList} */}
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          endIcon={<Icon>send</Icon>}
          onClick={postBestBuy}
        >
          投稿する
        </Button>
        <TimeLine />
      </Container>
    </Router>
  );
};

export default Home;
