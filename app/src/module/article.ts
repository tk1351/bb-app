import axios from 'axios'
import history from '../history'
import { BestBuy } from '../interface/bestBuy'

export const postArticle = async (values: BestBuy) => {
  const url = '/api/v1/post'

  try {
    await axios.post(url, values)
    history.push('/home')
  } catch (error) {
    console.error(error)
  }
}

export const learnMoreArticleDetail = (bestBuy: BestBuy) => {
  history.push({
    pathname: '/detail/' + bestBuy._id,
    state: {bestBuy}
  })
}