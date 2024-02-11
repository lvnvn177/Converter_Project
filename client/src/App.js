import React, { useState } from 'react';
import './App.css';
import Navigation from './components/nav.js';
import Dropbox from './components/box.js';
import ConvertButton from './components/ConvertButton.js';


// 구현할 거
// 1. 변환 버튼 : 변환버튼 누르고 이미지와 추출된 텍스트 띄우기
// 2. progress/spinner : 변환버튼 누르고 로딩 시간

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
      <ConvertButton />
      
      </>   
   
  );
}

export default App;
