import axios from 'axios'

interface User {
  username: string;
  email: string;
}

export const getUser = async () => {
  const url = '/api/v1/users'

  try {
    await axios.get(url)
    console.log(url)
  } catch(error) {
    console.error(error)
  }
} 
