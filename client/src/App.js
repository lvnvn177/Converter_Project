import React, { useState } from 'react';
import './App.css';
import Navigation from './components/nav.js';
import Dropbox from './components/box.js';

function App() {
  return (
    <>   
    <div className="App">
      <Navigation />
      </div>

      <div className="vertical-space"></div>
      <h3 className="center-text">Extract tables from PDF/Images</h3>
      <div className="vertical-space"></div>
      <Dropbox />
      
      </>   
   
  );
}

export default App;