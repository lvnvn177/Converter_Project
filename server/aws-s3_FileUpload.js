const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const { S3Client } = require("@aws-sdk/client-s3");
const path = require('path');
const dotenv = require('dotenv');
// awsS3FileUpload.js
const { Readable } = require("stream");
const { Upload } = require("@aws-sdk/lib-storage");

dotenv.config({ path: path.join('/home/lvnvn/Convert_test', '.env') });



const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.S3_BUCKET_NAME,
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        },
    }),
});



const uploadFileToS3 = async (file) => {
    const upload = new Upload({
        client: s3Client,
        params: {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: Date.now().toString() + '-' + file.originalname,
            Body: Readable.from(file.buffer),
        },
    });

    try {
        await upload.done();
        console.log('File uploaded successfully!');
    } catch (error) {
        console.error('File upload failed:', error);
    }
};

module.exports = { upload, uploadFileToS3 };
