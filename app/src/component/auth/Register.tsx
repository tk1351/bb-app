import React from 'react'
import RegisterForm from '../form/RegisterFormTemplate'
// import { getMongoDB } from '../../module/auth/register'

const Register = () => {

  return(
    <div>
      <p>新規登録</p>
      <RegisterForm></RegisterForm>
      {/* <button onClick={() => getMongoDB()}>情報持ってくる</button> */}
    </div>
  )
}

export default Register