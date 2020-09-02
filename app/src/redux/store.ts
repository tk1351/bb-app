import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './features/articlesSlice'

export default configureStore({
  reducer: {
    articles: articlesReducer
  }
})