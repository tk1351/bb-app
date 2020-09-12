import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BestBuy } from '../../interface/bestBuy';
import { 
  Button, 
  Card, 
  CardHeader, 
  Avatar, 
  IconButton, 
  CardMedia, 
  CardContent, 
  Typography, 
  CardActions,
  Link,
  Container,
  Chip,
  Paper,  
} from '@material-ui/core';
import history from '../../history'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useStyles } from '../../styles/timeLine'
import { goBackTimeLine } from '../../module/location';
import { initialCategory } from '../form/PostArticle';
import { Category } from '../../interface/category';

const initialValue = {
  _id: '',
  uid: '',
  title: '',
  text: '',
  tags: [''],
  categoryId: '',
  url: '',
  createdAt: new Date()
} 

const ArticleDetail = (props: { location: { state: { bestBuy: { _id: string; }; }; }; }) => {
  const [bestBuyDetail, setBestBuyDetail] = useState<BestBuy>(initialValue)
  const [categories, setCategories] = useState<Category[]>(initialCategory)

  useEffect(() => {
    getBestBuyById()
    getCategoriesName()
  },[])

  const getBestBuyById = async() => {
    const url = `/api/v1/post/${props.location.state.bestBuy._id}`

    try {
      await axios.get(url)
        .then((res) => {
          setBestBuyDetail(res.data)
        })
    } catch(error) {
      console.error(error)
    }
  }

  const deleteBestBuy = async() => {
    const url = `/api/v1/post/${props.location.state.bestBuy._id}`

    try {
      await axios.delete(url)
        .then((res) => {
          history.push('/home')
        })
    } catch(error) {
      console.error(error)
    }
  }

  const getCategoriesName = async () => {
    const url = '/api/v1/category'
    try {
      await axios.get(url)
        .then((res) => {
          setCategories(res.data)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const findCategoryName = () => {
    return categories.find((category) => 
      category._id === bestBuyDetail.categoryId)?.name
  }
  

  const classes = useStyles();

  return(
    <>
      <Container component='main' maxWidth='xs'>
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
              title={bestBuyDetail.title}
              subheader="September 14, 2016"
            />
            <CardMedia
              className={classes.media}
              image="/d9dddc.png"
              title={bestBuyDetail.title}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {bestBuyDetail.text}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                カテゴリー：{findCategoryName()}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {bestBuyDetail.tags.map(tag =>
                  <li className={classes.chipRoot}>
                    <Chip label={tag} className={classes.chip} />
                  </li>
                )}
              </Typography>
              <Link
                component="button"
                variant="body2"
                onClick={() => {
                  console.info("I'm a button.");
                }}
              >
                {bestBuyDetail.url}
              </Link>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Container>
        <div>
          <Button 
            onClick={goBackTimeLine} 
            variant="contained" 
            color="primary"
          >
            タイムラインへ戻る
          </Button>
          <Button 
            onClick={deleteBestBuy} 
            variant="contained" 
            color="secondary"
          >
            削除
          </Button>
      </div>
    </>
  )
}

export default ArticleDetail