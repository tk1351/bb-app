import React from 'react'
import { useFormik } from 'formik';
import { postNewRegister } from '../../module/auth/register'
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegisterForm = () => {
  const formik = useFormik( {
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    onSubmit: values => {
      postNewRegister(values)
  }})

  const classes = useStyles();
  const unRegister = formik.values.username === '' || formik.values.email === '' || formik.values.password === '' || formik.values.confirmPassword === ''

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h6">新規登録</Typography>
      <form className={classes.form} noValidate autoComplete="off"  onSubmit={formik.handleSubmit}>
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
          label="メールアドレス"
          variant="outlined"
          name="email"
          type="email"
          // pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
          onChange={formik.handleChange}
          value={formik.values.email}
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
        <TextField
          id="outlined-basic"
          margin="normal"
          label="パスワード（確認用）"
          variant="outlined"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          required
          fullWidth
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          disabled={unRegister}
          className={classes.submit}
          fullWidth
        >
          新規登録
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/login">
              既にアカウントを持っていますか?
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default RegisterForm
