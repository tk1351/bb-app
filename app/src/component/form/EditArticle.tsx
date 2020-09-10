import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import history from '../../history'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import { MenuItem } from '@material-ui/core';
import ChipInput from "material-ui-chip-input";
import { Category } from '../../interface/category';
import { useStyles } from '../../styles/postArticle'
import { BestBuy } from '../../interface/bestBuy';

const initialValue = {
  _id: '',
  uid: '',
  title: '',
  text: '',
  tags: [''],
  category: '',
  url: '',
  createdAt: new Date()
}

const initialCategory = [{
  _id: '',
  name: ''
}]

const EditArticle = (props: { location: { state: { bestBuy: { _id: string; }; }; }; }) => {
  const [tags,setTags] = useState<string[]>([])
  const [categories, setCategories] = useState<Category[]>(initialCategory)
  const [bestBuy, setBestBuy] = useState<BestBuy>(initialValue)

  useEffect(() => {
    getArticleDetail()
    getCategoriesName()
  },[])

  const getArticleDetail = async () => {
    const url = `/api/v1/post/${props.location.state.bestBuy._id}`
    try {
      await axios.get(url)
        .then((res) => {
          setBestBuy(res.data)
          setTags(res.data.tags)
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

  const editArticleById = async (value: BestBuy) => {
    const url = `/api/v1/post/${props.location.state.bestBuy._id}`
    try {
      await axios.put(url, {...value,tags})
      history.push('/home')
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddChip = (chip: string) => {
    setTags(prev => [...prev,chip])
  }

  const handleDeleteChip = (chip: string) => {
    setTags(prev => prev.filter(tag => tag !== chip))
  }

  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <Typography component='h1' variant='h6'>
        BestBuyを編集する
      </Typography>
      <Formik
        enableReinitialize={true}
        initialValues={bestBuy}
        onSubmit={(value) => {
          editArticleById(value)
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
              value={tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
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
  )
}

export default EditArticle