// app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./routes');
const { upload, uploadFileToS3 } = require('./aws-s3_FileUpload');
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

// Startup
app.listen(PORT, () => {
    console.log(`The API Server is listening on port: ${PORT}`);
});
