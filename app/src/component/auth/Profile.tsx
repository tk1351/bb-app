import React from 'react';
import { logout } from '../../module/auth/login';
import Button from '@material-ui/core/Button';


const Profile = () => {

  return(
    <>
      <p>プロフィール</p>
      <Button onClick={logout} variant="contained" color="secondary">ログアウト</Button>
    </>
  )
}

export default Profile