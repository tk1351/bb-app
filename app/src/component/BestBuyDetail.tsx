import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { BestBuy } from '../module/bestBuy';
import { Button } from '@material-ui/core';
import history from '../history'

const initialValue = {
  _id: '',
  title: '',
  text: '',
  tag: '',
  category: '',
  url: '',
  createdAt: new Date()
}

const BestBuyDetail = (props: { location: { state: { bestBuy: { _id: any; }; }; }; }) => {
  const [bestBuyDetail, setBestBuyDetail] = useState<BestBuy>(initialValue)

  useEffect(() => {
    getBestBuyById()
  },[])

  const getBestBuyById = async() => {
    const url = `/api/v1/post/${props.location.state.bestBuy._id}`

    try {
      await axios.get(url)
        .then((res) => {
          setBestBuyDetail(res.data)
        })
    } catch(error) {
      console.error(error)
    }
  }

  const deleteBestBuy = async() => {
    const url = `/api/v1/post/${props.location.state.bestBuy._id}`

    try {
      await axios.delete(url)
        .then((res) => {
          history.push('/home')
        })
    } catch(error) {
      console.error(error)
    }
  }

  return(
    <>
      <p>BestBuy 詳細</p>
      <p>日付：</p>
      <p>{bestBuyDetail.title}</p>
      <p>{bestBuyDetail.text}</p>
      <a href="">{bestBuyDetail.url}</a>
      <div>
        <Button onClick={deleteBestBuy} variant="contained" color="secondary">削除</Button>
      </div>
    </>
  )
}

export default BestBuyDetail