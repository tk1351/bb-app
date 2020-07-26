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
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="username">ユーザー名</label>
        <input
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
      </div>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
      </div>
      <div>
        <label htmlFor="password">パスワード</label>
        <input
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">パスワード（確認用）</label>
        <input
          name="confirmPassword"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
        />
      </div>
      <div>
        <button type="submit">登録</button>
      </div>
    </form>
  )
}

export default RegisterForm
