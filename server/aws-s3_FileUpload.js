const { Readable } = require("stream");
const { Upload } = require("@aws-sdk/lib-storage");
const pdf2img = require('pdf-img-convert');
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const { S3Client } = require("@aws-sdk/client-s3");
const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');
const { file_upload } = require('./png-to-model');
dotenv.config({ path: path.join('/home/lvnvn/Converter_Project', '.env') });

const s3Client = new S3Client({
    endpoint: 'https://s3-ap-northeast-2.amazonaws.com',
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
    region: 'ap-northeast-2',
    signatureVersion: 'v4',
});

const convertPdfToPng = async (pdf_file) => {
    try {
        // Check if PDF file is empty
        if (pdf_file.length === 0) {
            throw new Error('The PDF file is empty, i.e. its size is zero bytes.');
        }

        const pdfOutput = await pdf2img.convert(pdf_file);
        return pdfOutput;
    } catch (error) {
        console.error('PDF를 PNG로 변환하는 중 오류 발생:', error);
        throw error;  // 에러를 다시 throw합니다.
    }
};


const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.S3_BUCKET_NAME,
        key: function (req, file, cb) {
            const encodedFileName = encodeURIComponent(file.originalname);
            cb(null, 'original/' + Date.now().toString() + '-' + encodedFileName);
        },
    }),
});

const uploadFileToS3 = async (file) => {
    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);

    try {
        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: 'original/' + Date.now().toString() + '-' + file.originalname,
                Body: readableStream,
            },
        });
        //console.log('Original_File uploaded successfully!');
        const uploadResult = await upload.done();
       // console.log('uploadReult: ' + uploadResult.Key);
       // const objectUrl = `https://${process.env.S3_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${uploadResult.Key}`;
        const objectUrl = `https://${process.env.S3_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/original/1707575568803-file.pdf`;
        console.log('Original_File uploaded successfully!');
        console.log('업로드된 객체 URL:', objectUrl);
       
        const pngImages = await convertPdfToPng(objectUrl);

        if (pngImages && pngImages.length > 0) {
            for (let i = 0; i < pngImages.length; i++) {
                const pngReadableStream = new Readable();
                pngReadableStream.push(pngImages[i]);
                pngReadableStream.push(null);
                
                const upload_png = new Upload({
                    client: s3Client,
                    params: {
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: 'pdf to png/' + Date.now().toString() + '-' + file.originalname.replace('.pdf', `_page${i + 1}.png`),
                        Body: pngReadableStream,
                    },
                });

                try {
                    upload_res_png = await upload_png.done();
                  const objectUrl_png = `https://${process.env.S3_BUCKET_NAME}.s3.ap-northeast-2.amazonaws.com/${upload_res_png.Key}`;
                   // console.log('png 객체 url : ' + objectUrl_png);
                   // const s3 = new aws.S3({ accessKeyId: process.env.ACCESS_KEY_ID, secretAccessKey: process.env.secretAccessKey });
                    if(i==0){
                       file_upload(upload_res_png.Key);
                    }
                    console.log(`PNG 파일 ${i + 1}이(가) 성공적으로 업로드되었습니다!`);
                    //console.log('upload_file_url :' + upload_res_png.Key);
                } catch (error) {
                    console.error(`PNG 파일 ${i + 1} 업로드에 실패했습니다:`, error);
                }
            }
        } else {
            console.error('PDF를 PNG로 변환하는 데 실패했습니다.');
        }
    } catch (error) {
        console.error('Original_File upload failed:', error);
    }
}

module.exports = { upload, uploadFileToS3 };
