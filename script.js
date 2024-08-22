const apiKey = '09ec0b68ded5c22332cb126bbd01959b';

function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherResult = document.getElementById('weatherResult');

    if (city === "") {
        weatherResult.innerHTML = "Please enter a city name.";
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                weatherResult.innerHTML = "City not found.";
                return;
            }

            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

            weatherResult.innerHTML = `
                <h2>${city}</h2>
                <p>${description}</p>
                <img src="${icon}" alt="${description}">
                <p>Temperature: ${temperature}°C</p>
            `;
        })
        .catch(error => {
            weatherResult.innerHTML = "Error fetching weather data.";
            console.error(error);
        });
}
