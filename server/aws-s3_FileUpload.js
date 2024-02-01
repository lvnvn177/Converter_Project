const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const { S3Client } = require("@aws-sdk/client-s3");
const path = require('path');
const dotenv = require('dotenv');
// awsS3FileUpload.js
const { Readable } = require("stream");
const { Upload } = require("@aws-sdk/lib-storage");
const pdf2png = require('pdf2png'); 

dotenv.config({ path: path.join('/home/lvnvn/Convert_test', '.env') });



const s3Client = new S3Client({
    endpoint: 'https://s3-ap-northeast-2.amazonaws.com',
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    region: 'ap-northeast-2',
    signatureVersion: 'v4',
});

const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.S3_BUCKET_NAME,
        key: function (req, file, cb) {
            cb(null, 'original/' + Date.now().toString() + '-' + file.originalname);
        },
    }),
});

const uploadFileToS3 = async (file) => {
    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);  // Signal the end of the stream

    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: 'original/' + Date.now().toString() + '-' + file.originalname,
            Body: readableStream,
        },
    });

    try {
        await upload.done();
        console.log('Original_File uploaded successfully!');
    } catch (error) {
        console.error('Original_File upload failed:', error);
    }
};

module.exports = { upload, uploadFileToS3 };
