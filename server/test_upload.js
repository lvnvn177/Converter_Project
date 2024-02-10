const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join('/home/lvnvn/Converter_Project', '.env') });

console.log(process.env.REGION);