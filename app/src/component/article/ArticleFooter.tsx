import React, { useState } from 'react';
import { CardActions } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import { useStyles } from '../../styles/timeLine'
import { BestBuy } from '../../interface/bestBuy';
import history from '../../history'

const ArticleFooter = (props: { data: BestBuy; }) => {
  const classes = useStyles();

  const learnMoreArticleDetail = (bestBuy: BestBuy) => {
    history.push({
      pathname: '/detail/' + bestBuy._id,
      state: {bestBuy}
    })
  }

  const {data} = props

  return(
    <>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: false,
          })}
          aria-expanded="false"
          aria-label="show more"
          onClick={() => learnMoreArticleDetail(data)}
        >
        <ExpandMoreIcon />
      </IconButton>
      </CardActions>
    </>
  )
}

export default ArticleFooter