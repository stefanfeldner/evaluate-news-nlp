var path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("dist"));

console.log(__dirname);

const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config();

const apiKey = process.env.API_KEY;

app.get("/", function (req, res) {
    res.sendFile("dist/index.html");
});

const apiData = {};

app.post("/form", async function (req, res) {
    apiData.formText = req.body.formText;

    console.log("Link to extract article from: " + apiData.formText);

    await fetchMeaningcloudApi(fetchURL(apiKey, apiData.formText));

    res.status(200).send({
        success: true,
        message: "Data saved successfully",
        data: apiData,
    });
});

const fetchURL = (key, txt) => {
    return `https://api.meaningcloud.com/sentiment-2.1?&key=${key}&of=json&lang=en&verbose=y&txt=${txt}`;
};

const analyzeData = {};

const fetchMeaningcloudApi = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);

        if ("subjectivity" in data) {
            analyzeData.subjectivity = data.subjectivity;
            analyzeData.irony = data.irony;
        } else {
            throw new Error("Subjectivity empty");
        }
        console.log('Analysis Result:');
        console.log(analyzeData);
    } catch (err) {
        console.log("Error: " + err);
    }
};

app.get("/getData", (req, res) => {
    // sending projectData
    res.status(200).send(analyzeData);
    console.log("DATA SENT");
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log("Example app listening on port 8081!");
});

app.get("/test", function (req, res) {
    res.send(mockAPIResponse);
});

module.exports = app;