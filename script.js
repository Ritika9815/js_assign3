const API_KEY = "8ca29d8cf9de9e74ce61d12373876134";
let currentCity = "";

async function loadWeather(city) {
    document.getElementById("loading").classList.remove("hidden");

    const res = await fetch(https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric);
    const data = await res.json();

    currentCity = city;

    document.getElementById("weatherIcon").src = http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png;
    document.getElementById("weatherInfo").innerHTML = `
        <strong>${data.name}</strong><br>
        ${data.weather[0].description}<br>
        Temp: ${data.main.temp} °C<br>
        Humidity: ${data.main.humidity}%<br>
        Wind: ${data.wind.speed} m/s
    `;

    document.getElementById("loading").classList.add("hidden");
}

document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityName").value;
    if(city) loadWeather(city);
});