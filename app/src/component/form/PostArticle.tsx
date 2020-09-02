import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Formik, Form } from 'formik';
import { postArticle } from '../../module/article';
import { useAuth0 } from '@auth0/auth0-react';
import { useStyles } from '../../styles/postArticle'
import axios from 'axios'
import { BestBuy } from '../../interface/bestBuy';
import { MenuItem } from '@material-ui/core';
import ChipInput from "material-ui-chip-input";
import { Category } from '../../interface/category';

const initialCategory = [{
  _id: '',
  name: ''
}]

const initialValues = {
  uid: '',
  title: '',
  text: '',
  category: '',
  url: '',
  createdAt: new Date()
}

const PostArticle = () => {
  const { user, isAuthenticated } = useAuth0()
  const [tags,setTags] = useState<string[]>([])
  const [categories, setCategories] = useState<Category[]>(initialCategory)

  useEffect(() => {
    getCategoriesName()
  },[])

  const handleAddChip = (chip: string) => {
    setTags(prev => [...prev,chip])
  }

  const postArticleWithUid = async (values: BestBuy) => {
    if (!isAuthenticated) {
      return
    }
    const url = `/api/v1/users/${user.sub}`
    try {
      await axios.get(url)
        .then((res) => {
          const newValues = {...values, tags, uid: res.data[0]._id}
          postArticle(newValues)
        })
    } catch (error) {
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

  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <Typography component='h1' variant='h6'>
        BestBuyを投稿する
      </Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          postArticleWithUid(values)
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <TextField
              id='outlined-basic'
              margin='normal'
              label='商品名'
              variant='outlined'
              name='title'
              type='text'
              value={values.title}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              id='outlined-basic'
              margin='normal'
              label='紹介文'
              type='text'
              name='text'
              multiline
              rows={10}
              value={values.text}
              onChange={handleChange}
              variant='outlined'
              required
              fullWidth
            />
            <ChipInput
              id='outlined-basic'
              margin='normal'
              label='タグ'
              variant='outlined'
              onAdd={(chip) => handleAddChip(chip)}
              value={tags}
              fullWidth
            />
            <TextField
              id='outlined-basic'
              select
              margin='normal'
              label='カテゴリー'
              variant='outlined'
              name='category'
              type='text'
              value={values.category}
              onChange={handleChange}
              required
              fullWidth
            >
              {categories.map((category: Category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id='outlined-basic'
              margin='normal'
              label='URL'
              variant='outlined'
              name='url'
              type='text'
              value={values.url}
              onChange={handleChange}
              required
              fullWidth
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submit}
              fullWidth
            >
              投稿
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default PostArticle;
