document.getElementById("location-input").addEventListener('change', async () => {
    const location = document.getElementById("location-input").value;
    //should create this function
    const weatherData = await getWeatherData(location);
    //should create this function
    displayWeatherData(weatherData);

});

const getWeatherData = async (location) => {
    if (!location) {
        return {};
    }
    const apikey = 'dfdb240c1a5e12f1a1fbeb5d2e4fdb37';
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`);
    const data = await response.json();
    return data;
}

function getBackgroundColor(temperature) {
    if (temperature < 0) {
        return 'lightblue';
    }
    else if (temperature < 10) {
        return 'lightgreen';
    } else if (temperature < 20) {
        return 'lightyellow';
    } else if (temperature < 30) {
        return 'lightsalmon';
    } else {
        return 'lightcoral';
    }

}

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById('weather-data');

    if(Object.keys(data).length === 0){
        weatherDataElement.innerHTML = "Please enter the location to see weather";
    }else {
        const backGroundColor = getBackgroundColor(Math.floor(data.main.temp - 273.15));
        weatherDataElement.style.backgroundColor = backGroundColor;

        weatherDataElement.innerHTML = `
            <h3>${data.name}</h3>
            <p>Temperature: ${Math.floor(data.main.temp - 273.15)}*C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed}m/s</p>

        `;
    }
}
window.onload = async () => {
    const weatherData = await getWeatherData();
    displayWeatherData(weatherData);
}