import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: '',
  uid: '',
  title: '',
  text: '',
  tag: [],
  category: '',
  url: '',
  createdAt: new Date()
}

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {}
})

export default articlesSlice.reducer