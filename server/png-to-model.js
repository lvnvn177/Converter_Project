const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const aws = require('aws-sdk');
const sharp = require('sharp');

dotenv.config({ path: path.join(__dirname, '.env') });

const file_upload = async (url) => {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: url, // 가져올 파일의 키
        };

        const s3 = new aws.S3({ accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.SECRET_ACCESS_KEY });
        const fileData = await s3.getObject(params).promise();
        const imageData = fileData.Body;
        
        
        fs.writeFileSync('temp.png', imageData);
        
        const formData = new FormData();
        formData.append('file', fs.createReadStream('temp.png'));
        
        console.log(imageData.buffer);
        console.log('test');
        const response = await axios.post('http://127.0.0.1:6000/detection', formData, {
            headers: formData.getHeaders()
        });

        console.log('서버로부터의 응답:', response.data);
        fs.writeFileSync('response.json', JSON.stringify(response.data));
        console.log('File to python uploaded successfully!');

        const { a, b, c, d } = response.data;
        console.log("left : " + Math.round(b));
        console.log("top : " + Math.round(a));
        console.log("width : " + Math.round(c - a));
        console.log("height : " + Math.round(d - b));
        const extractedImageBuffer = await sharp('temp.png')
        .extract({ left: 66, top: 280, width: 454, height: 300 })
        .toBuffer();
        //.extract({ left: Math.round(a), top: Math.round(b), width: Math.round(c - a), height: Math.round(d - b) })
        //.extract({ left: 10, top: 10, width: 10, height: 10 })
        // 새로운 파일로 저장
         console.log('success_1!!!');
         fs.writeFileSync('extracted_table.png', extractedImageBuffer);
         console.log('success!!!')
        // console.log('file to extracted : ' + extractedImageBuffer);
    } catch (error) {
        console.error('File to python uploaded failed:', error);
    }
};

module.exports = { file_upload };
