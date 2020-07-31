import React from 'react';
import { logout } from '../../module/auth/login';
import Button from '@material-ui/core/Button';
import { getUser } from '../../module/getUser';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TimeLine from '../TimeLine';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const Profile = () => {
  const users = ['a', 'b']
  const userList = users.map((user) => 
    <li>{user}</li>
  )
  
  const classes = useStyles()
  return(
    <>
      <p>プロフィール</p>
      {/* <button onClick={getUser}>表示</button> */}
      {/* <ul>{userList}</ul> */}
      <Button variant="outlined">
          <Link to="#">プロフィール編集</Link>
        </Button>
      <Button onClick={logout} variant="contained" color="secondary">ログアウト</Button>
      <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <p>ユーザー名 @ID</p>
        </Grid>
        <Grid item xs={12}>
          <p>bio</p>
        </Grid>
        <Grid item xs={6}>
          <p>Followers</p>
        </Grid>
        <Grid item xs={6}>
          <p>Following</p>
        </Grid>
        <Grid item xs={6}>
          <TimeLine />
        </Grid>
        <Grid item xs={6}>
          <TimeLine />
        </Grid>
        <Grid item xs={6}>
          <TimeLine />
        </Grid>
        <Grid item xs={6}>
          <TimeLine />
        </Grid>
        <Grid item xs={6}>
          <TimeLine />
        </Grid>
        <Grid item xs={6}>
          <TimeLine />
        </Grid>
        <Grid item xs={6}>
          <TimeLine />
        </Grid>
        <Grid item xs={6}>
          <TimeLine />
        </Grid>
        <Grid item xs={6}>
          <TimeLine />
        </Grid>
        <Grid item xs={6}>
          <TimeLine />
        </Grid>
      </Grid>
      </div>
    </>
  )
}

export default Profile