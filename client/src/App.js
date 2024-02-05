import React, { useState } from 'react';
import './App.css';
import { createWorker } from 'tesseract.js';
import Navigation from './components/nav';
import ProgressBar from 'react-bootstrap/ProgressBar';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewText, setPreviewText] = useState(null);
  const [progress, setProgress] = useState(0);
  const [processingTime, setProcessingTime] = useState(null);
  const [imagePath, setImagePath] = useState("");
  const [fileType, setFileType] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const tempImagePath = URL.createObjectURL(file);
    setImagePath(tempImagePath);
    setSelectedFile(file);

    // 파일 유형 확인 및 설정
    if (file.type === 'application/pdf') {
      setFileType('pdf');
    } else if (file.type.startsWith('image/')) {
      setFileType('image');
    } else {
      setFileType('');
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
  };

  const handleOCRConvert = async () => {
    
    }
  
    const worker = createWorker();
  
    try {
      setProgress(0);
      const startTime = performance.now(); // 처리 시작 시간 측정
  
      await worker.load();
      await worker.loadLanguage('eng+kor');
      await worker.initialize('eng+kor');
  
      // 진행률 정보를 직접 업데이트
      const { data } = await worker.recognize(selectedFile, {
        onProgress: (progress) => {
          setProgress(progress.percent);
        },
      });
  
      const { text } = data;
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
  
  return (
    <>
      <div className="App">
        <Navigation />
      </div>

      {/* 업로드된 파일의 미리보기 */}
      <div className="file-preview">
        {fileType === 'pdf' ? (
          <embed src={imagePath} type="application/pdf" width="500" height="600" />
        ) : fileType === 'image' ? (
          <>
            <img src={imagePath} className="upload_img" alt='upload_img' style={{ maxWidth: '500px' }}/>
            {previewText && (
              <div className="text-preview">
                <p>미리보기 :</p>
                <p>{previewText}</p>
              </div>
            )}
          </>
        ) : (
          <p>No file uploaded</p>
        )}
      </div>

      {/* 파일 업로드 입력 필드 */}
      <input
        id="fileInput"
        type="file"
        accept=".pdf, .jpg, .jpeg"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div>
        <button className="btn btn-primary" onClick={handleUploadClick}>
          Upload File
        </button>
        {selectedFile && (
          <span style={{ marginLeft: '8px' }}>
            파일명 : {selectedFile.name}
          </span>
        )}
      </div>

      {/* OCR 변환 버튼 항상 표시 */}
      <div className="mt-3">
        <button className="btn btn-success" onClick={handleOCRConvert}>
          Convert
        </button>
      </div>

      {/* 처리 시간 표시 */}
      {processingTime && (
        <div className="mt-3 progress-time">
          <p>처리 시간: {processingTime} 초 </p>
        </div>
      )}

      {/* 진행률 표시 */}
      {progress > 0 && progress < 100 && (
        <div className="mt-3">
          <ProgressBar now={progress} label={`${progress}%`} />
        </div>
      )}

    </>
  );
}

export default App;
