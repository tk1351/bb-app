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

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  }
}));

const LoginForm = () => {
  const formik = useFormik( {
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: values => {
      login(values)
    }
  })

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h6">ログイン</Typography>
      <form className={classes.form} noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <TextField 
          id="outlined-basic" 
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
