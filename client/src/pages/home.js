// Home.js, app.js 내용

import React from 'react';
import Navigation from '../components/nav.js';
import Dropbox from '../components/box.js';
import ConvertButton from '../components/ConvertButton.js';
import '../App.css';

function Home() {
  return (
    <>   
    <div className="home">
      <Navigation />
      </div>

      <div className="vertical-space"></div>
      <h3 className="center-text">Extract tables from PDF/Images</h3>
      <div className="vertical-space"></div>
      <Dropbox />
      <ConvertButton />
      
      </>   
   
  );
}

export default Home;
