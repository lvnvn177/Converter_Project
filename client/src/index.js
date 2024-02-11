import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-dropzone-uploader/dist/styles.css';
import App from './App.js';
import * as serviceWorker from './serviceWorker';
import * as pdfjsLib from 'pdfjs-dist';
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

pdfjsLib.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.js`;

serviceWorker.register(); // 또는 unregister() 대신 register()를 호출하여 서비스 워커를 등록합니다.
