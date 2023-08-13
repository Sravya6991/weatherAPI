const cityname = document.getElementById("cityname");
const countryName = document.getElementById("country");
const weatherTemp = document.getElementById("temperature");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("description");
const weatherHumidity = document.getElementById("humidity");
const windSpeed = document.getElementById("speed");
const sunriseTime = document.getElementById("sunriseTime");
const sunsetTime = document.getElementById("sunsetTime");

const searchCity = document.getElementById("search");
const form = document.getElementById("form"); 

window.addEventListener('load', () => {
    let lat;
    let lon;
    let apiKey = "15af1a301faea07c720eca567ebc0aad"
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            console.log(lat)
            lon = position.coords.longitude;
            console.log(lon)
            // let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
            
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&unit=metrics`
            
            fetch(url)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                    getWeatherData(data);
                })
        });
    }
});


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let city = searchCity.value; // e.g: london
    console.log(city);

    let apiKey = "15af1a301faea07c720eca567ebc0aad"
    searchurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetch(searchurl)
        .then(res => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            const result = getWeatherData(data);
            if(result) {
                searchCity.value = ' ';
                return result;
            }
        })
});


function getWeatherData(data) {
    const place = data.name;
    const { temp, humidity } = data.main;
    const { description, icon } = data.weather[0];
    const { speed } = data.wind;
    const { country, sunrise, sunset } = data.sys;

    // convert farheniet to celsius
    const celsius = ((`${temp}` - 32) * 5)/9; 
    
    // convert sunrise/sunset => epooch time to GMT
    const sunriseGMT = new Date(sunrise*1000);
    const sunsetGMT = new Date(sunset*1000)

    // insert data into DOM
    const iconURL = `https://openweathermap.org/img/wn/${icon}.png`

    weatherIcon.src = iconURL;
    cityname.textContent = place;
    countryName.textContent = `${country}`;
    console.log(`${country}`)
    weatherTemp.textContent = celsius.toFixed(2) + ` C`;
    weatherDescription.textContent = `${description}`;
    weatherHumidity.textContent = `${humidity} %`;
    windSpeed.textContent = `${speed} m/s`; 
    sunriseTime.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
    sunsetTime.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
}


