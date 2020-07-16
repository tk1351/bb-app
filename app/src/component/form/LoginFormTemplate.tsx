import React from 'react'
import { useFormik } from 'formik';

const LoginForm = () => {
  const formik = useFormik( {
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: values => {
      console.log(values)
    }
  })

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
        <label htmlFor="password">パスワード</label>
        <input
          name="password"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
      </div>
      <div>
        <button type="submit">登録</button>
      </div>
    </form>
  )
}

export default LoginForm
