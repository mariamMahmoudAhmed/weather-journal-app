// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 5000;
const server = () =>
    console.log(`You server is running on localhost :${port}`);
//console.log(req.body);
app.listen(port, server);
// Callback  for the GET function
app.get("/allDataWeatherJournal", function (req, res) {
    res.send(projectData)
})
// Callback  for the POST function
app.post("/addingDataWeatherJournal", addWeatherJournal);

function addWeatherJournal(req, res) {
    projectData = { ...req.body };
    res.send(projectData);
    console.log(req.body);
}