import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { InputBase, makeStyles, createStyles, Theme, fade } from '@material-ui/core';
import { useFormik } from 'formik';
import { searchArticle } from '../../module/search';
import { useStyles } from '../../styles/searchWindow'

const SearchWindow = () => {
  const classes = useStyles();
  
  const formik = useFormik( {
    initialValues: {
      queryParam: ''
    },
    onSubmit: queryParam => {
      console.log(queryParam)
      searchArticle(queryParam)
    }
  })

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <form onSubmit={formik.handleSubmit}>

        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={formik.handleChange}
          value={formik.values.queryParam}
          name="queryParam"
          type="search"
        />
      </form>
    </div>
  )
}

export default SearchWindow