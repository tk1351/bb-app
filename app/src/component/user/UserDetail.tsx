import React, { useState, useEffect } from 'react'
import { Button, Grid, makeStyles, createStyles, Theme, Container } from '@material-ui/core'
import TimeLine from '../article/TimeLine'
import axios from 'axios';
import { useStyles } from '../../styles/userDetail'

const initialValue = {
  _id: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const UserDetail = (props: { location: { state: { user: { _id: string; }; }; }; }) => {
  const [userDetail, setUserDetail] = useState<any>(initialValue)

  useEffect(() => {
    getUserById()
  }, [])

  const getUserById = async() => {
    const url = `/api/v1/users/${props.location.state.user._id}`

    try {
      await axios.get(url)
        .then((res) => {
          setUserDetail(res.data)
        })
    } catch(error) {
      console.error(error)
    }
  }

  const classes = useStyles()
  
  return(
    <>
      <p>プロフィール</p>
      <Button 
        variant="contained"
        color="primary"
      >
        プロフィール編集
      </Button>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <p>ユーザー名{userDetail.username}</p>
          </Grid>
          <Grid item xs={12}>
            <p>bio</p>
          </Grid>
          <Grid item xs={6}>
            <p>Followers</p>
          </Grid>
          <Grid item xs={6}>
            <p>Following</p>
          </Grid>
          <Container component="main" maxWidth="xs">
            <TimeLine />
          </Container>
        </Grid>
      </div>
    </>
  )
}

export default UserDetail