import React, { useState, useEffect } from 'react'
import { Category } from '../../interface/category';
import axios from 'axios'

const initialCategory = {
  _id: '',
  name: ''
}

const CategoryPage = (props: { location: { state: { category: { _id: string; }; }; }; }) => {
  const [category, setCategory] = useState<Category>(initialCategory)

  useEffect(() => {
    getCategoryName()
  }, [])

  const getCategoryName = async () => {
    const url = `/api/v1/category/${props.location.state.category._id}`
    try {
      await axios.get(url)
        .then((res) => {
          setCategory(res.data)
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {category.name}
    </>
  )
}

export default CategoryPage