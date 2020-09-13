import React from 'react';
import './App.css';
import Navbar from './component/common/Navbar';
import Loading from './component/common/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import Sidebar from './component/common/Sidebar';

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>{error.message}</div>;
  }

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className='App'>
      <Navbar />
      <Sidebar />
    </div>
  );
};

export default App;
