import React, { useState, useEffect } from 'react';
import { Router, Link, Route } from 'react-router-dom';
import history from '../../history';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import TimeLine from '../TimeLine';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { UserDetailInfo } from '../../interface/userDetailInfo';
import { pushPostArticlePage } from '../../module/location';

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

  const classes = useStyles();

  return (
    <Router history={history}>
      <Container component='main' maxWidth='xs'>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          endIcon={<Icon>send</Icon>}
          onClick={pushPostArticlePage}
        >
          投稿する
        </Button>
        <TimeLine />
      </Container>
    </Router>
  );
};

export default Home;
