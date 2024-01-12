const express = require('express');
const app = express();

console.log(app)

app.get('/', (req, res) => {
    res.send('Hello from server!')
})