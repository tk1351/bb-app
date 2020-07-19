import React from 'react';
import { useFormik } from 'formik';
import { Container, Form, Button } from 'react-bootstrap';

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    // <form onSubmit={formik.handleSubmit}>
    //   <div>
    //     <label htmlFor="username">ユーザー名</label>
    //     <input
    //       name="username"
    //       type="text"
    //       onChange={formik.handleChange}
    //       value={formik.values.username}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="email">メールアドレス</label>
    //     <input
    //       name="email"
    //       type="email"
    //       onChange={formik.handleChange}
    //       value={formik.values.email}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="password">パスワード</label>
    //     <input
    //       name="password"
    //       type="text"
    //       onChange={formik.handleChange}
    //       value={formik.values.password}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor="confirmPassword">パスワード（確認用）</label>
    //     <input
    //       name="confirmPassword"
    //       type="text"
    //       onChange={formik.handleChange}
    //       value={formik.values.confirmPassword}
    //     />
    //   </div>
    //   <div>
    //     <button type="submit">登録</button>
    //   </div>
    // </form>
    <Container>
      <Form>
        <Form.Group controlId='formBasicId'>
          <Form.Label>アカウント名</Form.Label>
          <Form.Control
            type='text'
            placeholder=''
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicEmail'>
          <Form.Label>メールアドレス</Form.Label>
          <Form.Control
            type='email'
            placeholder=''
            name='email'
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <Form.Text className='text-muted'></Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>パスワード</Form.Label>
          <Form.Control
            type='password'
            placeholder=''
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>パスワード（確認用）</Form.Label>
          <Form.Control
            type='password'
            placeholder=''
            name='confirmPassword'
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          登録
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;
