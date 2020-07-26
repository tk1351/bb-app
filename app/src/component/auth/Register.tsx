import React from 'react'
import RegisterForm from '../form/RegisterFormTemplate'
// import { getMongoDB } from '../../module/auth/register'

const Register = () => {

  return(
    <div>
      <p>Register</p>
      <RegisterForm></RegisterForm>
      {/* <button onClick={() => getMongoDB()}>情報持ってくる</button> */}
    </div>
  )
}

export default Register