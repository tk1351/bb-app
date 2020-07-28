import axios from 'axios'
import history from '../../history'

interface PostLoginValues {
  username: string;
  password: string;
}

export const login = async (values: PostLoginValues) => {
  const url = '/api/v1/users/login'
  
  try {
    const response = await axios.post(url, values)
    localStorage.setItem('username', values.username)
    localStorage.setItem('app-auth', response.data)
    history.push('/home')
  } catch (error) {
    console.error(error)
  } 

}

export const logout = () => {
  localStorage.removeItem('username')
  localStorage.removeItem('app-auth')
}