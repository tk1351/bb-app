import history from '../history';

export const pushPostArticlePage = () => {
  history.push('/submit');
}

export const goBackTimeLine = () => [
  history.push('/home')
]