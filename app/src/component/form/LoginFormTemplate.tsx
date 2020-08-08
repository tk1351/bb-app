import React from 'react'
import { useFormik } from 'formik';
import { login } from '../../module/auth/login';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { CssBaseline } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  const formik = useFormik( {
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: values => {
      // login(values)
      // loginWithRedirect
    }
  })

  const classes = useStyles();
  const unLogin = formik.values.username === '' || formik.values.password === ''

  return !isAuthenticated && (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
        <Typography component="h1" variant="h6">ログイン</Typography>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <TextField 
            id="outlined-basic" 
            margin="normal"
            label="ユーザー名" 
            variant="outlined" 
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            required
            fullWidth
          />
          <TextField 
            id="outlined-basic" 
            margin="normal"
            label="パスワード" 
            variant="outlined" 
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
            fullWidth
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={unLogin}
            className={classes.submit}
            fullWidth
          >
            ログイン
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/register">
                アカウントを作成していませんか?
              </Link>
            </Grid>
          </Grid>
        </form>
    </Container>
  )
}

export default LoginForm
