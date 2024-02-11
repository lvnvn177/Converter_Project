import React from 'react';
import './ConvertButton.css';
//ocr 작업 시작하도록 구현 + 페이지 넘어가기 전에 로딩 

const ConvertButton = ({ onClick }) => {




  return (
    <div className="button-container">
    <button className="convert-button" onClick={onClick}>
      convert
      </button>
    </div>
  );
}

export default ConvertButton;