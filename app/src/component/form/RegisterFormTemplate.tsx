import React from 'react'
import { useFormik } from 'formik';
import { postNewRegister } from '../../module/auth/register'

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
          <label htmlFor="email" className="col-sm col-form-label text-md-left">メールアドレス</label>
          <input
            className="form-control"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
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
        <div className="form-group">
          <label htmlFor="confirmPassword" className="col-sm col-form-label text-md-left">パスワード（確認用）</label>
          <input
            className="form-control"
            name="confirmPassword"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            required
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">登録</button>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
