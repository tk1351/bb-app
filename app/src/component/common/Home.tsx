import React from 'react'
import { Router, Link } from "react-router-dom";
import history from '../../history'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import TimeLine from '../TimeLine';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Home = () => {
  const user = localStorage.getItem('username')
  const classes = useStyles();

  return(
    <Router history={history}>
      <Container component="main" maxWidth="xs">
        <p>Home</p>
        <p>ようこそ{user}さん</p>

        <Button 
          variant="outlined" 
          className={classes.button} 
          endIcon={<Icon>send</Icon>}
        >
          <Link to="/submit">投稿する</Link>
        </Button>
        <TimeLine />
        <TimeLine />
        <TimeLine />
        <TimeLine />
      </Container>
    </Router>
  )
}

export default Home