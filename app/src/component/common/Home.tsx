import React from 'react';
import { Router } from 'react-router-dom';
import history from '../../history';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TimeLine from '../article/TimeLine';
import Container from '@material-ui/core/Container';
import { pushPostArticlePage } from '../../module/location';
import { useStyles } from '../../styles/home'
import { useAuth0 } from '@auth0/auth0-react';
import { Typography, CssBaseline, Grid, Card, CardMedia, CardContent, CardActions } from '@material-ui/core';
import Sidebar from './Sidebar';

//FIXME: 実際の記事から3-4つ程度取得
const cards = [1, 2, 3];

const Home = () => {
  const classes = useStyles();
  const { isAuthenticated, loginWithRedirect, } = useAuth0();

  return (
    <Router history={history}>
      {isAuthenticated && (
        <Container component='main' maxWidth='xs'>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            endIcon={<Icon>send</Icon>}
            onClick={pushPostArticlePage}
          >
            投稿する
          </Button>
          <TimeLine />
          <Sidebar />
          
          
        </Container>
      )}
      {!isAuthenticated && (
        <>
          <CssBaseline />
            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                  あなたにぴったりのBest Buyを探そう！
                </Typography>
                <Typography variant="h6" align="center" color="textSecondary" paragraph>
                  ユーザーのおすすめ商品から欲しいものがきっと見つかる
                </Typography>
                <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                      <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => loginWithRedirect({})}
                      >
                        新規登録
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button 
                        variant="outlined" 
                        color="primary"
                        onClick={() => loginWithRedirect({})}
                      >
                        ログイン
                      </Button>
                    </Grid>
                  </Grid>
                </div>
              </Container>
            </div>
            {/* FIXME: 実際の投稿を表示させる */}
            <Container className={classes.cardGrid} maxWidth="md">
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                人気記事
              </Typography>
              <Grid container spacing={4}>
                {cards.map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image="https://source.unsplash.com/random"
                        title="Image title"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          タイトル
                        </Typography>
                        <Typography>
                          記事詳細...
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          View
                        </Button>
                        <Button size="small" color="primary">
                          Edit
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
        </>
      )}
    </Router>
  );
};

export default Home;
