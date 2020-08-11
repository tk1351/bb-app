import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import { BestBuy } from '../interface/bestBuy';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Box } from '@material-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { learnMoreArticleDetail } from '../module/article';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: blue[500],
  },
}));

const theme = {
  spacing: 1,
}

const initialValue = [{
  _id: '',
  title: '',
  text: '',
  tag: '',
  category: '',
  url: '',
  createdAt: new Date()
}]

const TimeLine = () => {
  const [bestBuyLists, setBestBuyLists] = useState<BestBuy[]>(initialValue)
  const [expanded, setExpanded] = useState(false)
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    getBestBuy()
  },[])

  const getBestBuy = async () => {
    if(!isAuthenticated){
      return
    }

    const url = `/api/v1/post/user/${user.sub}`

    try {
      await axios.get(url)
        .then((res) => {
          setBestBuyLists(res.data)
        })
    } catch(error) {
      console.error(error)
    }
    
  }

  const classes = useStyles();

  if(!bestBuyLists){
    // FIXME:投稿がない場合のDOMを検討
    console.log("no post");
    return <></>;
  }

  return(
    <>
      {bestBuyLists.map(bestBuy =>
        <Box m={2}>
          <Card raised className={classes.root} onClick={() => learnMoreArticleDetail(bestBuy)}>
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
            />
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