import React, { useState } from 'react';
import './App.css';
import { createWorker } from 'tesseract.js';
import Navigation from './components/nav';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewText, setPreviewText] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if the selected file is a PDF or an image
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

  const handlePreviewClick = async () => {
    if (!selectedFile) {
      alert('Please upload a file first');
      return;
    }

    const worker = createWorker();

    try {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      const { data: { text } } = await worker.recognize(selectedFile);
      setPreviewText(text);
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
          <p>Step 1: Upload File</p>
          <button className="btn btn-primary" onClick={handleUploadClick}>
            Upload File
          </button>
        </div>

        {/* 2단계: 미리보기 버튼 */}
        {selectedFile && (
          <div className="mt-3">
            <p>Step 2: Preview</p>
            <button className="btn btn-success" onClick={handlePreviewClick}>
              Preview
            </button>
          </div>
        )}

        {/* 텍스트 미리보기 */}
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
