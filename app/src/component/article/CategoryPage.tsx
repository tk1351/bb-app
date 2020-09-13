import React, { useState, useEffect } from 'react'
import { Category } from '../../interface/category';
import axios from 'axios'
import { BestBuy } from '../../interface/bestBuy';
import { initialValue } from './TimeLine';
import { Box, Card, CardMedia, CardContent, Typography, Container } from '@material-ui/core';
import ArticleHeader from './ArticleHeader';
import ArticleFooter from './ArticleFooter';
import { useStyles } from '../../styles/timeLine';

const initialCategory = {
  _id: '',
  name: ''
}

const CategoryPage = (props: { location: { state: { category: { _id: string; }; }; }; }) => {

  const [category, setCategory] = useState<Category>(initialCategory)
  const [categoryPostsList, setCategoryPostsList] = useState<BestBuy[]>(initialValue)

  useEffect(() => {
    getCategoryName()
    getPostsMatchCategory()
  }, [props])

  const getCategoryName = async () => {
    const url = `/api/v1/category/${props.location.state.category._id}`
    try {
      await axios.get(url)
        .then((res) => {
          setCategory(res.data)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const getPostsMatchCategory = async () => {
    const url = `/api/v1/post/category/${props.location.state.category._id}`
    try {
      await axios.get(url)
        .then((res) => {
          setCategoryPostsList(res.data)
        })
    } catch (error) {
      console.error(error)
    }
  }

  const classes = useStyles();
  
  return (
    <>
      <Container component='main' maxWidth='xs'>
        <Typography variant="body2" color="textSecondary" component="p">
          カテゴリー：{category.name}の投稿
        </Typography>
        {categoryPostsList.map(categoryPost => 
          <Box m={2}>
            <Card raised className={classes.root}>
              <ArticleHeader data={categoryPost} />
              <CardMedia
                className={classes.media}
                image="/d9dddc.png"
                title={categoryPost.title}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {categoryPost.text.substring(0,10)}...
                </Typography>
              </CardContent>
              <ArticleFooter data={categoryPost} />
            </Card>
          </Box>
        )}
      </Container>
    </>
  )
}

export default CategoryPage