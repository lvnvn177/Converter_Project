var pdf2img = require('pdf-img-convert');
var fs = require('fs');

var outputImages1 = pdf2img.convert('https://converter-upload-bucket.s3.ap-northeast-2.amazonaws.com/original/1706776254892-test_1.pdf');

outputImages1.then(function(outputImages) {
    for (i = 0; i < outputImages.length; i++)
        fs.writeFile("output"+i+".png", outputImages[i], function (error) {
          if (error) { console.error("Error: " + error); }
        });
    });