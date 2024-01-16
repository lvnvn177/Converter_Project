import React, { useEffect, useState } from 'react';
import './App.css';
import Dropzone from 'react-dropzone-uploader';
import { createWorker } from "tesseract.js";

function App() {
  const [text, setText] = useState(null);

  useEffect(() => {
    // Create a Tesseract worker pool
    const worker = createWorker();

    async function ExtractTextFromImage(imageUrl) {
      try {
        await worker.load();
        await worker.loadLanguage("eng");
        await worker.initialize("eng");

        const { data: { text } } = await worker.recognize(imageUrl);
        setText(text);
      } catch (error) {
        console.error('텍스트 추출 중 오류 발생:', error);
      } finally {
        await worker.terminate();
      }
    }

    // Cleanup Tesseract worker when component unmounts
    return () => worker.terminate();
  }, []); // Only run this effect once during component mount

  const getUploadParams = () => ({
    url: 'https://httpbin.org/post',
  });

  const handleChangeStatus = ({ meta }, status) => {
    if (status === 'headers_received') {
      alert("Uploaded");
      setText("Recognizing...");
      ExtractTextFromImage(meta.previewUrl, setText);
    } else if (status === 'aborted') {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light justify-content-center mt-3">
        <a className="navbar-brand" href="/">
          React OCR
        </a>
        <br />
        <p>Optical Character Recognition with React and Tesseract.js</p>
      </nav>

      <Dropzone
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        maxFiles={1}
        multiple={false}
        canCancel={false}
        accept="image/jpeg, image/png, image/jpg"
        inputContent={(files, extra) => (extra.reject ? 'Only PNG and JPG Image files are allowed' : 'Drop  image here')}
        styles={{
          dropzoneActive: {
            borderColor: 'green',
          },
          dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
          inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
        }}
      />
      <div className="container text-center pt-5">{text}</div>
    </>
  );
}

export default App;
