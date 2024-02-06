const path = require('path');

module.exports = {
    mode: 'development',

    entry: {
        main: './src/app.js'
    },

  resolve: {
    fallback: {
      fs: false // fs 모듈을 제외
    },
  },
};