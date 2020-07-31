import React from 'react'
import { Router, Link } from "react-router-dom";
import Routes from './Routes';
import history from '../../history'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Navbar = () => {
  const classes = useStyles();
  
  return(
    <Router history={history}>
      <div>
        
        <Link to="/home">Home</Link>
        <Link to="/login">ログイン</Link>
        <Link to="/register">新規登録</Link>
        <Link to="/profile">プロフィール</Link>

        <Routes />
      </div>
    </Router>
  )
}

export default Navbar