const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const aws = require('aws-sdk');

dotenv.config({ path: path.join(__dirname, '.env') });

const file_upload = async (url) => {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: url, // 가져올 파일의 키
        };

        const s3 = new aws.S3({ accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY });
        const fileData = await s3.getObject(params).promise();

        const formData = new FormData();
        formData.append('file', fileData.Body, 'file.jpg');

        const response = await axios.post('http://127.0.0.1:6000/detection', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        console.log('서버로부터의 응답:', response.data);
        fs.writeFileSync('response.json', JSON.stringify(response.data));
        console.log('File to python uploaded successfully!');
    } catch (error) {
        console.error('File to python uploaded failed:', error);
    }
};

module.exports = { file_upload };
