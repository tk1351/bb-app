import axios from 'axios'
import history from '../../history'

interface PostRegisterValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const postNewRegister = async (values: PostRegisterValues) => {
  const url = '/api/v1/users/register'
  try {
    await axios.post(url, values)
    history.push('/login')
  } catch (error) {
    console.error(error)
  }
}