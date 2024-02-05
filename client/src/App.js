import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';
import Navigation from './components/nav';
import pdf2img from 'pdf-img-convert'; // PDF를 이미지로 변환하기 위한 라이브러리 추가

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewText, setPreviewText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadedFileName(file.name);
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

    try {
      if (selectedFile.type === 'application/pdf') {
        const text = await convertPdfToText(selectedFile);
        setPreviewText(text);
      } else if (selectedFile.type.startsWith('image/')) {
        const text = await performOcr(selectedFile);
        setPreviewText(text);
      } else {
        alert('Only image and PDF files are supported for upload.');
      }
    } catch (error) {
      console.error('Error occurred: ', error);
    }
  };

  const convertPdfToText = async (pdfFile) => {
    try {
      const imagePath = await convertPdfToImage(pdfFile);
      const worker = createWorker();
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(imagePath);
      await worker.terminate();
      return text;
    } catch (error) {
      console.error('Error converting PDF to text:', error);
      return '';
    }
  };

  const convertPdfToImage = async (pdfFile) => {
    try {
      // PDF를 이미지로 변환하는 로직 추가
      const options = {
        density: 200, // 이미지 해상도 (DPI)
        outputFormat: 'png', // 출력 포맷 (PNG)
        singleProcess: true // 단일 프로세스로 실행
        // 다양한 옵션들이 있으니 필요에 따라 조정할 수 있습니다
      };
      const images = await pdf2img.convert(pdfFile.path, options); // PDF를 이미지로 변환
      return images[0]; // 첫 번째 이미지 경로 반환
    } catch (error) {
      console.error('Error converting PDF to image:', error);
      return '';
    }
  };

  const performOcr = async (imageFile) => {
    try {
      const worker = createWorker();
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(imageFile);
      await worker.terminate();
      return text;
    } catch (error) {
      console.error('Error performing OCR:', error);
      return '';
    }
  };

  return (
    <>
      <div className="App">
        <Navigation />
      </div>

      <div className="container text-center mt-5">
        <input
          id="fileInput"
          type="file"
          accept=".pdf, .jpg, .jpeg"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <div>
          <p>1. Upload File</p>
          <button className="btn btn-primary" onClick={handleUploadClick}>
            Upload File
          </button>
        </div>

        {uploadedFileName && (
          <p>Uploaded File: {uploadedFileName}</p>
        )}

        <div className="mt-3">
          <p>2. Convert</p>
          <button className="btn btn-success" onClick={handleConvertClick}>
            Convert
          </button>
        </div>

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
