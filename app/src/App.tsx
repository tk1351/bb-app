import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './component/common/Navbar'

const App = () => {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
