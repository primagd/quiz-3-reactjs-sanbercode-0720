import React from 'react';
import Routes from './3_Router/Routes'
import Navbar from './6_Login/Nav'
import {BrowserRouter as Router} from 'react-router-dom';
import { MovieProvider } from './6_Login/MovieContext';
import './Tugas2/public/css/style.css'
import './App.css'


function App() {
  return (
  <div>
    <MovieProvider>
        <Router>
          <Navbar/>
          <Routes/>
        </Router>
      </MovieProvider>
  </div>
  );
}

export default App;
