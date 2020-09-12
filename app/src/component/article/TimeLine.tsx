import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import { BestBuy } from '../../interface/bestBuy';
import CardMedia from '@material-ui/core/CardMedia';
import { Box, Grid } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { useStyles } from '../../styles/timeLine'
import ArticleHeader from './ArticleHeader';
import ArticleFooter from './ArticleFooter';

const initialValue = [{
  _id: '',
  uid: '',
  title: '',
  text: '',
  tags: [],
  categoryId: '',
  url: '',
  createdAt: new Date()
}]



const TimeLine = () => {
  const [bestBuyLists, setBestBuyLists] = useState<BestBuy[]>(initialValue)
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    insertUserInfo()
    getOwnArticles()
  },[])

  const classes = useStyles();

  //FIXME: Auth0のRulesへ移行を検討
  const insertUserInfo = async () => {
    if (!isAuthenticated) {
      return
    }

    const url = '/api/v1/users'

    try {
      await axios.post(url, user)
    } catch (error) {
      console.error(error)
    }
  }

  //FIXME: 名前やばいから変更
  const getOwnArticles = async () => {
    if (!isAuthenticated) {
      return
    }

    const url = `/api/v1/users/${user.sub}`

    try {
      await axios.get(url)
        .then((res) => {
          const uid = res.data[0]._id
          const uidUrl = `/api/v1/post/user/${uid}`

          axios.get(uidUrl)
            .then((res) => {
              setBestBuyLists(res.data)
            })
        })
    } catch (error) {
      console.error(error)
    }
  }

  if(!bestBuyLists){
    // FIXME:投稿がない場合のDOMを検討
    console.log("no post");
    return <></>;
  }

  return(
    <>
      {bestBuyLists.map(bestBuy =>
        <Box m={2}>
          <Card raised className={classes.root}>
            <ArticleHeader data={bestBuy} />
            <CardMedia
              className={classes.media}
              image="/d9dddc.png"
              title={bestBuy.title}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {bestBuy.text.substring(0,10)}...
              </Typography>
            </CardContent>
            <ArticleFooter data={bestBuy} />
          </Card>
        </Box>
      )}
    </>
  )
}

export default TimeLine