import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios'
import { BestBuy } from '../module/bestBuy';
import history from '../history'
import moment from 'moment'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const initialValue = [{
  _id: '',
  title: '',
  text: '',
  tag: '',
  category: '',
  url: '',
  createdAt: new Date()
}]

moment()

const TimeLine = () => {
  const [bestBuyList, setBestBuyList] = useState<BestBuy[]>(initialValue)

  useEffect(() => {
    getBestBuy()
  },[])

  const getBestBuy = async () => {
    const url = '/api/v1/post'

    try {
      await axios.get(url)
        .then((res) => {
          setBestBuyList(res.data)
        })
    } catch(error) {
      console.error(error)
    }
  }

  const learnMore = (bestBuy: BestBuy) => {
    history.push({
      pathname: '/detail/' + bestBuy._id,
      state: {bestBuy}
    })
  }

  const classes = useStyles();

  return(
    <>
      {bestBuyList.map(bestBuy => 
        <Card className={classes.root} onClick={() => learnMore(bestBuy)}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              日付
            </Typography>
            <Typography variant="h5" component="h2">
              {bestBuy.title}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              カテゴリー:{bestBuy.category}
            </Typography>
            <Typography variant="body2" component="p">
              詳細を確認する
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  )
}

export default TimeLine