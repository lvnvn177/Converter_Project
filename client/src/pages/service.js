import React from 'react';
import Navigation from '../components/nav.js';
import { useLocation } from 'react-router-dom';

function Service() {

  return (
    <>
    <Navigation />
    <div className="service">
      서비스 창입니다
    </div>
    </>
  );
}


export default Service;
