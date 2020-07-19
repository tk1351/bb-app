import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavigationBar from './component/common/Navbar'

const App = () => {
  return (
    <div className="App">
      <NavigationBar />
    </div>
  );
}

export default App;
