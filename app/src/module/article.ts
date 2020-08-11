import axios from 'axios'
import history from '../history'
import { Article } from '../interface/article'
import { BestBuy } from '../interface/bestBuy'

export const postArticle = async (values: Article) => {
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