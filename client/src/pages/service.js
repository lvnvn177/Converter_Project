// Service.js

import React from 'react';

function Service({ handleFileChange, handleUploadClick, handlePreviewClick, selectedFile, previewText }) {
  return (
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
  );
}

export default Service;
