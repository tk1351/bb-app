import React, { useState } from 'react';
import clsx from 'clsx';
import { Router, Link } from 'react-router-dom';
import Routes from './Routes';
import history from '../../history';
import { useTheme } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  CssBaseline,
  Divider,
  List,
  ListItemText,
  Button,
  Avatar,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SearchWindow from './SearchWindow';
import { useAuth0 } from '@auth0/auth0-react';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useStyles } from '../../styles/nabvar'


const Navbar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuId = 'primary-search-account-menu';

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>プロフィール</MenuItem>
      <MenuItem onClick={handleMenuClose}>設定</MenuItem>
    </Menu>
  );

  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const logoutWithRedirect = () =>
    logout({
      returnTo: window.location.origin,
    });

  return (
    <Router history={history}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap color='inherit'>
              <Link
                to='/home'
                className={classes.routerLink}
                onClick={handleDrawerClose}
              >
                Best Buy
              </Link>
            </Typography>
            <SearchWindow />
            {isAuthenticated && (
              <IconButton
                onClick={handleProfileMenuOpen}
                edge='end'
                aria-label='account of current user'
                aria-haspopup='true'
                color='inherit'
              >
                <Avatar src={user.picture} className={classes.avater}/>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        {renderMenu}

        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List onClick={handleDrawerClose}>
            {!isAuthenticated && (
              <Button
                onClick={() => loginWithRedirect({})}
                className={classes.link}
              >
                ログイン
              </Button>
            )}
            {isAuthenticated && (
              <Link to='/profile' className={classes.link}>
                <ListItemText primary='プロフィール' />
              </Link>
            )}
            {isAuthenticated && (
              <Button onClick={() => logoutWithRedirect()}>ログアウト</Button>
            )}
          </List>
          <Button onClick={() => console.log(JSON.stringify(user, null, 2))}>
            ログ
          </Button>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>
      <Routes />
    </Router>
  );
};

export default Navbar;
