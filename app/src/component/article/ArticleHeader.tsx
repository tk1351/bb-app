import React from 'react';
import { Menu, MenuItem, CardHeader, Avatar, IconButton } from '@material-ui/core';
import { BestBuy } from '../../interface/bestBuy';
import history from '../../history'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useStyles } from '../../styles/timeLine'

const ArticleHeader = (props: { data: BestBuy; }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const classes = useStyles();

  const handleMoreVertOpen = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleMoreVertClose = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null)
  }

  const editArticle = (bestBuy: BestBuy) => {
    history.push({
      pathname: '/edit/' + bestBuy._id ,
      state: { bestBuy }
    })
  }

  const {data} = props

  return (
    <>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            B
          </Avatar>
        }
        action={
          <IconButton 
            aria-label="settings"
            onClick={handleMoreVertOpen}
          >
            <MoreVertIcon />
          </IconButton>
        }
        title={data.title}
        subheader="September 14, 2016"
      />
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMoreVertClose}
      >
        <MenuItem onClick={() => editArticle(data)} children="記事の編集" />
      </Menu>
    </>
  )
}

export default ArticleHeader