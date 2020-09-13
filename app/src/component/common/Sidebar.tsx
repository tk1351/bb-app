import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import axios from 'axios'
import { Category } from '../../interface/category';
import { useStyles } from '../../styles/sidebar';
import history from '../../history'
import { Button, Grid } from '@material-ui/core';

const initialCategory = [{
  _id: '',
  name: ''
}]

const Sidebar = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategory)

  useEffect(() => {
    getCategoriesName()
  }, [])

  const classes = useStyles();

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


  const transitionToCategoryPage = (category: Category) => {
    history.push({
      pathname: '/category/' + category._id,
      state: {category}
    })
  }

  return(
    <>
      <Grid container justify="flex-end">
        <Grid item xs={3}>
          <Paper elevation={0} className={classes.sidebarAboutBox}>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Typography>このサイトについて</Typography>
          </Paper>
          <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
            カテゴリー
          </Typography>
            {categories.map((category: Category) => (
              <Link 
                display="block"
                className={classes.link}
                onClick={() => transitionToCategoryPage(category)}
              >
                {category.name}
              </Link>
            ))}
        </Grid>
      </Grid>
    </>
  )
}

export default Sidebar