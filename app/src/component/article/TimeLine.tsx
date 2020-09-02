import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import { BestBuy } from '../../interface/bestBuy';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Box } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { learnMoreArticleDetail } from '../../module/article';
import { useStyles } from '../../styles/timeLine'
import { useSelector } from 'react-redux'

const initialValue = [{
  _id: '',
  uid: '',
  title: '',
  text: '',
  tags: [],
  category: '',
  url: '',
  createdAt: new Date()
}]

const TimeLine = () => {
  const [bestBuyLists, setBestBuyLists] = useState<BestBuy[]>(initialValue)
  const [expanded, setExpanded] = useState(false)
  const { user, isAuthenticated } = useAuth0();

  // const articles = useSelector((state: any) => state.articles)

  // const renderedArticles = articles.map((article: any) => (
  //   <>
  //     <h3>{ article.title }</h3>
  //     <p>{ article.text }</p>
  //   </>
  // ))

  useEffect(() => {
    insertUserInfo()
    getOwnArticles()
  },[])

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

  const classes = useStyles();

  if(!bestBuyLists){
    // FIXME:投稿がない場合のDOMを検討
    console.log("no post");
    return <></>;
  }
  //

  return(
    <>
      {bestBuyLists.map(bestBuy =>
        <Box m={2}>
          <Card raised className={classes.root}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                  B
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={bestBuy.title}
              subheader="September 14, 2016"
              onClick={() => learnMoreArticleDetail(bestBuy)}
            />
            <CardMedia
              className={classes.media}
              image="/d9dddc.png"
              title={bestBuy.title}
              onClick={() => learnMoreArticleDetail(bestBuy)}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p" onClick={() => learnMoreArticleDetail(bestBuy)}>
                {bestBuy.text.substring(0,10)}...
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                aria-expanded={expanded}
                aria-label="show more"
                onClick={() => learnMoreArticleDetail(bestBuy)}
              >
              <ExpandMoreIcon />
            </IconButton>
            </CardActions>
          </Card>
        </Box>
      )}
      
    </>
  )
}

export default TimeLine