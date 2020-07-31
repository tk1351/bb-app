import axios from 'axios'
import history from '../history'

interface PostBestBuy {
  title: string;
  text: string;
  tag: string;
  category: string;
  url: string
}

export const postBestBuy = async (values: PostBestBuy) => {
  const url = '/api/v1/post'

  try {
    await axios.post(url, values)
    history.push('/home')
  } catch (error) {
    console.error(error)
  }
}