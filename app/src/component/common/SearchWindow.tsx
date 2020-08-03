import React, { useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import { InputBase, makeStyles, createStyles, Theme, fade } from '@material-ui/core';
import { useFormik } from 'formik';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }),
);

interface QueryParam {
  queryParam: string
}

const SearchWindow = () => {
  const classes = useStyles();
  
  const formik = useFormik( {
    initialValues: {
      queryParam: ''
    },
    onSubmit: queryParam => {
      console.log(queryParam)
      const search = async (queryParam: QueryParam) => {
        const url = '/api/v1/search/searchPost'

        try {
          await axios.post(url, queryParam)
            .then((res) => {
              console.log(res.data)
            })
        } catch (error) {
          console.error(error)
        }
      }
      search(queryParam)
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