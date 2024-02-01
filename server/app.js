// app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./routes');
const { upload, uploadFileToS3 } = require('./aws-s3_FileUpload');
//const { spawn } = require ('child_process');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(morgan('dev'));

// Import the routing setup 
app.use('/', router);

// routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// upload
app.post('/upload', upload.single('file'), (req, res) => {

    uploadFileToS3(req.file);

    res.json({ message: 'File uploaded successfully!' });
});
/*
const startFlaskServer = () => {
    const flaskProcess = spawn('python', ['./learn_server.py']);

    flaskProcess.stdout.on('data', (data) => {
        console.log('Flask server print: ${data');
    });

    flaskProcess.stderr.on('data', (data) => {
        console.error('Flask 서버 오류: ${data}');
    });

    flaskProcess.on('close', (code) => {
        console.log('Flask 서버가 코드 ${code}로 종료되었습니다.');
    });
};
*/
// Startup
app.listen(PORT, () => {
    startFlaskServer();
    console.log(`The API Server is listening on port: ${PORT}`);
});
