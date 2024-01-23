import React, { useState, useEffect } from 'react';
import './App.css';
import { createWorker } from 'tesseract.js';
import Navigation from './components/nav';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewText, setPreviewText] = useState(null);
  const [progress, setProgress] = useState(0);
  const [processingTime, setProcessingTime] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // pdf 또는 이미지 처리
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setSelectedFile(file);
    } else {
      alert('Only PDF and image files are allowed');
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };

  const handleConvertClick = async () => {
    if (!selectedFile) {
      alert('Please upload a file first');
      return;
    }

    const worker = createWorker();

    try {
      setProgress(0);
      const startTime = performance.now(); // 처리 시작 시간 측정

      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      const { data: { text } } = await worker.recognize(selectedFile);
      setPreviewText(text);

      const endTime = performance.now(); // 처리 종료 시간 측정
      const processingTimeInSeconds = ((endTime - startTime) / 1000).toFixed(2);
      setProcessingTime(processingTimeInSeconds); // 처리 시간 설정

      setProgress(100);
    } catch (error) {
      console.error('Text extraction error:', error);
    } finally {
      await worker.terminate();
    }
  };

  useEffect(() => {
    const handleFileUpload = async () => {
      if (!selectedFile) {
        alert('Please upload a file first');
        return;
      }

      const worker = createWorker();

      try {
        setProgress(0);
        const startTime = performance.now(); // 처리 시작 시간 측정

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');

        // 여기에서 파일 업로드와 관련된 작업 수행

        const endTime = performance.now(); // 처리 종료 시간 측정
        const processingTimeInSeconds = ((endTime - startTime) / 1000).toFixed(2);
        setProcessingTime(processingTimeInSeconds); // 처리 시간 설정

        setProgress(100);
      } catch (error) {
        console.error('File upload error:', error);
      } finally {
        await worker.terminate();
      }
    };

    handleFileUpload();
  }, [selectedFile]);

  return (
    <>
      <div className="App">
        <Navigation />
      </div>

      <div className="container text-center mt-5">
        {/* 1단계: 파일 업로드 버튼 */}
        <input
          id="fileInput"
          type="file"
          accept=".pdf, .jpg, .jpeg"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <div>
          <p>1. 파일 업로드</p>
          <button className="btn btn-primary" onClick={handleUploadClick}>
            Upload File
          </button>
        </div>

        {/* 2단계: 변환 버튼 */}
        {selectedFile && (
          <div className="mt-3">
            <p>2. 변환하기</p>
            <button className="btn btn-success" onClick={handleConvertClick}>
              Convert
            </button>
          </div>
        )}

      
        {/* 추가된 부분: 처리 시간 표시 */}
        {processingTime && (
          <div className="mt-3">
            <p>Processing Time:</p>
            <p>{processingTime} seconds</p>
          </div>
        )}

        {/* 추출된 결과 미리보기 */}
        {previewText && (
          <div className="mt-5">
            <p>Preview:</p>
            <p>{previewText}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
