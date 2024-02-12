import React, { useState } from 'react';
import './ConvertButton.css';
import { ClipLoader } from 'react-spinners';

const ConvertButton = ({ onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true); // 클릭 시 로딩 상태 활성화
    await new Promise(resolve => setTimeout(resolve, 5000));
    window.open('http://localhost:3000/#service', '_blank');
    setIsLoading(false); // 작업 완료 후 로딩 상태 비활성화
  };

  return (
    <div className="button-container">
      <button className="convert-button" onClick={handleClick} disabled={isLoading}>
        {isLoading ? <ClipLoader color={'#ffffff'} loading={true} size={15} /> : 'Convert'}
      </button>
    </div>
  );
};

export default ConvertButton;
