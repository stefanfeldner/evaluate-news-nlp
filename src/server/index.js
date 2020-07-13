var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');

const app = express();

app.use(express.static('dist'));

console.log(__dirname);

// Require the Aylien npm package
var AYLIENTextAPI = require('aylien_textapi');

const dotenv = require('dotenv');
const { response } = require('express');
dotenv.config();

const textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY,
});

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

const data = []

app.post('/form', function (req, res) {
    console.log(req.body)
    data.push(req.body)
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
});