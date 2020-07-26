import axios from 'axios'

interface PostValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// export const getMongoDB = async () => {
//   const url = '/api/v1/users'
//   try {
//     const response = await axios.get(url)
//     return { isSuccess: true, data: response.data, error: null }
//   } catch (error) {
//     return { isSuccess: false, data: null, error }
//   }
// }

export const postNewRegister = async (values: PostValues) => {
  const url = '/api/v1/users/register'
  try {
    const response = await axios.post(url, values)
    return { isSuccess: true, data: response.data, error: null }
  } catch (error) {
    return { isSuccess: false, data: null, error }
  }
}