var pdf2img = require('pdf-img-convert');
var fs = require('fs');

var output_images_1 = pdf2img.convert('/home/lvnvn/Converter_Project/2018-08-071138401294210_상세_커리큘럼_차세대_클라우드_.pdf');

output_images_1.then(function(outputImages){
    for (i = 0; i < outputImages.length; i++) {
        fs.writeFile("/home/lvnvn/Converter_Project/server/test_png/"+i+".png", outputImages[i], function (error) {
          if (error) { console.error("Error: " + error); }
        });
    }
});
