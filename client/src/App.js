import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';
import Navigation from './components/nav';
import { getDocument } from 'pdfjs-dist/build/pdf'; // getDocument 가져오기

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewText, setPreviewText] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadedFileName(file.name); // 파일 선택시 파일 이름 설정
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
      // pdf는 이미지로 변환해서 ocr 처리 / 이미지는 그대로 ocr 처리
      if (selectedFile.type === 'application/pdf') {
        const imageDataUrl = await convertPdfToImage(selectedFile);
        const text = await performOcr(imageDataUrl);
        setPreviewText(text);
      } else if (selectedFile.type.startsWith('image/')) {
        const imageDataUrl = await readFileAsDataURL(selectedFile);
        const text = await performOcr(imageDataUrl);
        setPreviewText(text);
      } else {
        alert('이미지와 pdf 파일만 업로드 가능합니다.');
      }
    } catch (error) {
      console.error('에러 발생 : ', error);
    }
  };

  const convertPdfToImage = async (pdfFile) => {
    console.log('Converting PDF to image...');
    try {
      const fileDataUrl = await readFileAsDataURL(pdfFile); // 파일을 데이터 URL로 읽기
      const pdf = await getDocument({ data: fileDataUrl }).promise; // 데이터 URL을 사용하여 getDocument 호출
      console.log('PDF loaded successfully.');
      const page = await pdf.getPage(1);
      console.log('Page loaded successfully.');

      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
      console.log('PDF rendered to canvas successfully.');

      return canvas.toDataURL(); // 이미지 데이터 URL 반환
    } catch (error) {
      console.error('Error converting PDF to image:', error);
      return null;
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const performOcr = async (imageDataUrl) => {
    console.log('Performing OCR on the image...');
    const worker = createWorker();
    try {
      await worker.load();
      await worker.loadLanguage('eng+kor');
      await worker.initialize('eng+kor');
      console.log('Tesseract initialized.');

      const { data: { text } } = await worker.recognize(imageDataUrl);
      console.log('OCR performed successfully.');
      return text;
    } catch (error) {
      console.error('OCR error:', error);
      return null;
    } finally {
      await worker.terminate();
    }
  };

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

        {/* 업로드된 파일 이름 표시 */}
        {uploadedFileName && (
          <p>Uploaded File: {uploadedFileName}</p>
        )}

        {/* 2단계: 변환 버튼 */}
        <div className="mt-3">
          <p>2. 변환하기</p>
          <button className="btn btn-success" onClick={handleConvertClick}>
            Convert
          </button>
        </div>

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
