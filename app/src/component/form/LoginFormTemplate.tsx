import React from 'react'
import { useFormik } from 'formik';
import { login } from '../../module/auth/login';

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

  return (
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="col-sm col-form-label text-md-left">ユーザー名</label>
          <input
            className="form-control"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="col-sm col-form-label text-md-left">パスワード</label>
          <input
            className="form-control"
            name="password"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">ログイン</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
