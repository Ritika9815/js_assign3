const API_KEY = "8ca29d8cf9de9e74ce61d12373876134";
let currentCity = "";

async function loadWeather(city) {
    document.getElementById("loading").classList.remove("hidden");

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!res.ok) throw new Error("City not found");
        
        const data = await res.json();

        currentCity = city;

        document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById("weatherInfo").innerHTML = `
            <strong>${data.name}</strong><br>
            ${data.weather[0].description}<br>
            Temp: ${data.main.temp} °C<br>
            Humidity: ${data.main.humidity}%<br>
            Wind: ${data.wind.speed} m/s
        `;
    } catch (error) {
        document.getElementById("weatherInfo").innerHTML = `<span style="color: red;">Error: ${error.message}</span>`;
    } finally {
        document.getElementById("loading").classList.add("hidden");
    }
}

document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityName").value.trim();
    if(city) loadWeather(city);
});

const cities = ["Toronto", "London", "New York", "Paris", "Tokyo", "Sydney"];

document.getElementById("randomBtn").addEventListener("click", () => {
    const city = cities[Math.floor(Math.random() * cities.length)];
    loadWeather(city);
});
document.getElementById("favBtn").addEventListener("click", () => {
    if(!currentCity) return alert("Search for a city first!");
    let favs = JSON.parse(localStorage.getItem("favs")) || [];
    if(!favs.includes(currentCity)) favs.push(currentCity);
    localStorage.setItem("favs", JSON.stringify(favs));
    renderFavorites();
});

function renderFavorites() {
    let favs = JSON.parse(localStorage.getItem("favs")) || [];
    let html = "";
    favs.forEach(city => {
        html += <div onclick="loadWeather('${city}')">${city}</div>;
    });
    document.getElementById("favorites").innerHTML = html;
}

renderFavorites();
