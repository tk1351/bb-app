import React from 'react'

const Home = () => {
  const user = localStorage.getItem('username')

  return(
    <div>
      <p>Home</p>
      <p>ようこそ{user}さん</p>
    </div>
  )
}

export default Home