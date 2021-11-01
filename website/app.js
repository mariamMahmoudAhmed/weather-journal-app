/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
// My API key from OpenWeather website
const apiKey = "&units=metric&appid=128e372cfcc62a5fade1c783f35c9253";
const serverUrl = "http://localhost:5000";
const buttonGenerate = document.getElementById("generate");
//Create an event listener for the element id generate with a callback function to execute when it is clicked.
buttonGenerate.addEventListener("click", generateWeatherJournal);
function generateWeatherJournal() {
    const zipCode = document.querySelector("#zip").value;
    if (!zipCode) {
        alert("You need to enter a zip code");
    }
    const feelings = document.getElementById("feelings").value;
    //calling my async GET request 
    getZipCodeTemp(zipCode)
        .then((result) => {
            const data = {
                newData:newDate,
                temp: result ,
                feelings:feelings,
            };
         // console.log(JSON.stringify(data));
            //post data to server, async function to make this POST request
            async function postDataToServer() {
                const res = await fetch(serverUrl +'/addingDataWeatherJournal', {
                    method: "POST",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                }); 
            }
            postDataToServer();
            //this function will GET Project Data and will update the UI
            async function updateTheUi() {
                try {
                    const res = await fetch(serverUrl +'/allDataWeatherJournal');
                    const content = await res.json();
                    document.getElementById("date").innerHTML = content.newData;
                    document.getElementById("content").innerHTML = content.feelings;
                    document.getElementById("temp").innerHTML = content.temp ;
                    console.log(data); 
                } catch (error) {
                    console.log(error);
                }
            };
            updateTheUi();
        });

}
//Writing an async function uses fetch() to make a GET request to the OpenWeatherMap API.
async function getZipCodeTemp(zipCode) {
    try {
        const response = await fetch(baseUrl + zipCode + apiKey);
        const data = await response.json();
        const temp = data.main.temp;
        console.log(baseUrl + zipCode + apiKey);
        return temp;
    }
    catch (error) {
        console.log(error);
    }
}
