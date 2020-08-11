import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import { postArticle } from '../../module/article';
import { useAuth0 } from '@auth0/auth0-react';
import { useStyles } from '../../styles/postArticle'

const PostArticle = () => {
  const { user } = useAuth0();

  const formik = useFormik({
    initialValues: {
      //FIXME: uidの型を要検討
      uid: user.sub as string,
      title: '',
      text: '',
      tag: '',
      category: '',
      url: '',
      createdAt: new Date()
    },
    onSubmit: (values) => {
      postArticle(values);
    },
  });

  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <Typography component='h1' variant='h6'>
        BestBuyを投稿する
      </Typography>
      <form
        className={classes.form}
        noValidate
        autoComplete='off'
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id='outlined-basic'
          margin='normal'
          label='商品名'
          variant='outlined'
          name='title'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.title}
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
          variant='outlined'
          onChange={formik.handleChange}
          value={formik.values.text}
          required
          fullWidth
        />
        <TextField
          id='outlined-basic'
          margin='normal'
          label='タグ'
          variant='outlined'
          name='tag'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.tag}
          required
          fullWidth
        />
        <TextField
          id='outlined-basic'
          margin='normal'
          label='カテゴリー'
          variant='outlined'
          name='category'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.category}
          required
          fullWidth
        />
        <TextField
          id='outlined-basic'
          margin='normal'
          label='URL'
          variant='outlined'
          name='url'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.url}
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
      </form>
    </Container>
  );
};

export default PostArticle;
