// 드롭박스 기능 컴포넌트 

// box 스타일시트, axios 라이브러리 임포트
import React, { useState, useEffect } from 'react';
import './box.css'; 
import { PacmanLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// 드롭박스 아이콘 
const Logo = () => (
  <svg className="icon" x="0px" y="0px" viewBox="0 0 24 24">
    <path fill="transparent" d="M0,0h24v24H0V0z" />
    <path
      fill="#000"
      d="M20.5,5.2l-1.4-1.7C18.9,3.2,18.5,3,18,3H6C5.5,3,5.1,3.2,4.8,3.5L3.5,5.2C3.2,5.6,3,6,3,6.5V19  c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6.5C21,6,20.8,5.6,20.5,5.2z M12,17.5L6.5,12H10v-2h4v2h3.5L12,17.5z M5.1,5l0.8-1h12l0.9,1  H5.1z"
    />
  </svg>
);
// 업로드된 파일 정보 
const FileInfo = ({ uploadedInfo }) => (
  <ul className="preview_info">
    {Object.entries(uploadedInfo).map(([key, value]) => (
      <li key={key}>
        <span className="info_key">{key}</span>
        <span className="info_value">{value}</span>
      </li>
    ))}
  </ul>
);
// 파일 업로드 기능 
const UploadBox = () => {
  const [isActive, setActive] = useState(false); // 드롭박스 활성 상태 변수
  const [uploadedInfo, setUploadedInfo] = useState(null); // 업로드된 파일 정보 
  const [isLoading, setIsLoading] = useState(false); // 업로드 중 상태 변수
  const [uploadStartTime, setUploadStartTime] = useState(null); // 업로드 시작 시간
  const [elapsedTime, setElapsedTime] = useState(0); // 경과 시간
  const navigate = useNavigate();
  
  // 파일 정보 설정 함수
  const setFileInfo = (file) => {
    const { name, size: byteSize, type } = file;
    const size = (byteSize / (1024 * 1024)).toFixed(2) + 'mb';
    setUploadedInfo({ name, size, type });  // name, size, type 정보를 uploadedInfo에 저장
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setActive(false);
    
    const file = event.dataTransfer.files[0];
    setFileInfo(file);
  };

  const handleUpload = async ({ target }) => {
    const file = target.files[0];
    setUploadedInfo(file);

    console.log(file)
    // 파일 업로드 중 상태 설정

    setIsLoading(true);
    //객체 생성 및 파일 데이터 담기
    
    const formData = new FormData();
    formData.append('file', file);

    setUploadStartTime(Date.now()); // 시작 시간 설정

    try {
      // 서버로 파일 전송 및 응답 대기
      const response = await axios.post('/upload', formData);
      
      // 서버로부터 받은 응답을 JSON 형식으로 파싱
      const data = response.data;

      // 서버로 받은 파일 URL 상태에 설정
      setUploadedInfo(data);

      /// 파일 업로드 완료 후 Service.js로 이동
    setTimeout(() => {
      setIsLoading(false);
      navigate('/service', { state: { uploadedInfo } }); // 파일 정보를 Service로 전달
    }, 5000); // 2초 후 이동 (테스트용)
    } catch (error) {
      console.error('파일 업로드 중 오류 발생: ', error);
    }

    

  };

  const handleDragStart = () => setActive(true);
  const handleDragEnd = () => setActive(false);

  // 아래 두 함수 drop/dragover : 브라우저 새 창 뜨는 거 방지
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  
  

  useEffect(() => {
    // 시작 시간과 현재 시간의 차이를 계산하여 경과 시간 설정
    if (isLoading) {
      const interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - uploadStartTime) / 1000); // 경과 시간 (초)
        setElapsedTime(elapsed);
      }, 1000); // 1초마다 경과 시간 업데이트
      
      return () => clearInterval(interval);
    }
  }, [isLoading, uploadStartTime]);

  return (
    // 파일 선택하거나 드래그하여 업로드 하는 기능
    <label
      className={`preview${isActive ? ' active' : ''}`}
      onDragEnter={handleDragStart}
      onDragOver={handleDragOver}
      onDragLeave={handleDragEnd}
      onDrop={handleDrop}
    >


      {/* 파일 업로드가 완료되고, isLoading이 true인 경우에만 스피너 표시 */}
      {isLoading && (
        <div className="spinner-container">
          <PacmanLoader color={'#008080'} loading={true} size={40} />
          <div style={{ textAlign: "center" }}>
            <p style={{ marginTop: "40px", color: "rgb(1B1D1D)", fontWeight: "bold" }}>Loading...</p>
            <p style={{ color: "rgb(1B1D1D)", fontWeight: "bold" }}>{elapsedTime}초</p>
          </div>
        </div>
      )}
      <input type="file" className="file" onChange={handleUpload} disabled={isLoading} />
      {/* 로고 및 안내 메시지 표시 */}
      {!isLoading && !uploadedInfo && (
        <>
          <Logo />
          <p className="preview_msg">클릭 혹은 파일을 이곳에 드롭하세요.</p>
          <p className="preview_desc">파일당 최대 3MB</p>
        </>
      )}
    </label>
    
  );
};


function Dropbox() {
  return (
    <div className="dropbox-container">
      <UploadBox />
    </div>
  );
}

export default Dropbox;

