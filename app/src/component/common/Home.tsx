import React, { useState, useEffect } from 'react';
import { Router, Link, Route } from 'react-router-dom';
import history from '../../history';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TimeLine from '../article/TimeLine';
import Container from '@material-ui/core/Container';
import { pushPostArticlePage } from '../../module/location';
import { useStyles } from '../../styles/home'

const Home = () => {
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
