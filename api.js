//Quickly assign some constants (Seeing that the page never changes structure)
const TEMPERATURE_VAL = document.querySelector(".temperature")
const DESCRIPTION_VAL = document.querySelector(".weather-description")
const LOCATION_VAL = document.querySelector(".location-name")
const MAIN_ELEMENT = document.getElementById("main");

/**
 * Get the weather information from the server
 * @param {number} city the name of the current city
 */
function requestInfo(city){
    
    var api_key = '2368a8eca65a0b8a45967918e966cb92';
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=imperial`;

    fetch(api).then(response=>response.json()).then(result => weatherDetails(result));

}

/**
 * Capitalizes the first letter of every word
 * @param {string} str the string we wish to capitalize
 */
const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

/**
 * Handles the weather details retrieved from our API
 * @param {string} str the string we wish to capitalize
 */
function weatherDetails(info)
{
    //Debug text!
    console.log(info);

    //Retrieve our values from our requested data
    var currentWeather = info.weather[0].main;
    var currentTemp = Math.floor(info.main.temp);

    //Update our HTML based on new values
    LOCAITON_VAL.innerHTML = "<img class ='location-icon' src='images/icons/destination.png'>"+info.name; 
    TEMPERATURE_VAL.innerHTML = `${currentTemp}°`;
    DESCRIPTION_VAL.innerHTML = "<h1>"+capitalizeWords(info.weather[0].description)+"</h1>";

    //Little screen flash
    document.getElementById('main').classList.remove("fade-in");
    setTimeout(() => {
        document.getElementById('main').classList.add("fade-in");       
    }, 1);

    var icon_val = document.querySelector(".weather-icon")
    var elm = MAIN_ELEMENT
    var newone = elm.cloneNode(true);
    elm.parentNode.replaceChild(newone, elm);

    // Not entirely sure if this is the cleanest way to do this 
    // but it was the quickest I could think of
    switch(currentWeather) {
        case "Clear":
            icon_val.src = "images/icons/clear.svg"
            break;
        case "Clouds":
            icon_val.src = "images/icons/cloud.svg"      
            break;
        case "Thunderstorm":
            icon_val.src = "images/icons/storm.svg"   
            break;
        case "Rain":
            icon_val.src = "images/icons/rain.svg"                 
            break;
        case "Snow":
            icon_val.src = "images/icons/snow.svg"  
            break;
        default:
            icon_val.src = "images/icons/clear.svg"
            break;
    }
}

/**
 * Get the weather information for a city based on name.
 * Retrieved through document query.
 */
function getWeatherDetails()
{
    var city = document.getElementById("search").value;
    requestInfo(city)
}