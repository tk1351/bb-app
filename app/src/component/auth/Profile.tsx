import React from 'react';
import { logout } from '../../module/auth/login';


const Profile = () => {

  return(
    <>
      <p>プロフィール</p>
      <button onClick={logout}>ログアウト</button>
    </>
  )
}

export default Profile