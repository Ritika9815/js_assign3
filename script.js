// OpenWeatherMap API key for authentication
const API_KEY = "6dee1429e3d17748c130f9e865924f28";
// Store the currently selected city
let currentCity = "";

// Fetch weather data from API and update the UI
async function loadWeather(city) {
    // Show loading indicator while fetching data
    document.getElementById("loading").classList.remove("hidden");

    try {
        // Call OpenWeatherMap API with city name and API key
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        // Convert response to JSON format
        const data = await res.json();

        // Save the city name for favorites functionality
        currentCity = city;

        // Update weather icon based on API response
        document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        // Display weather details: city name, description, temperature, humidity, and wind speed
        document.getElementById("weatherInfo").innerHTML = `
            <strong>${data.name}</strong><br>
            ${data.weather[0].description}<br>
            Temp: ${data.main.temp} °C<br>
            Humidity: ${data.main.humidity}%<br>
            Wind: ${data.wind.speed} m/s
        `;
    } catch (error) {
        // Show error message if API call fails or city not found
        document.getElementById("weatherInfo").innerHTML = `<span style="color: red;">Error: ${error.message}</span>`;
    } finally {
        // Hide loading indicator after operation completes
        document.getElementById("loading").classList.add("hidden");
    }
}

// Handle search button click to fetch weather for entered city
document.getElementById("searchBtn").addEventListener("click", () => {
    // Get city name from input field and remove extra spaces
    const city = document.getElementById("cityName").value.trim();
    // Only fetch if city name is not empty
    if(city) loadWeather(city);
});

// List of popular cities for random weather feature
const cities = ["Toronto", "London", "New York", "Paris", "Tokyo", "Sydney"];

// Handle random city button to show weather for a random city
document.getElementById("randomBtn").addEventListener("click", () => {
    // Pick a random city from the list
    const city = cities[Math.floor(Math.random() * cities.length)];
    loadWeather(city);
});

// Handle add to favorites button
document.getElementById("favBtn").addEventListener("click", () => {
    // Alert user if no city has been searched yet
    if(!currentCity) return alert("Search for a city first!");
    // Get existing favorites from browser storage or create empty array
    let favs = JSON.parse(localStorage.getItem("favs")) || [];
    // Add city to favorites only if it's not already there
    if(!favs.includes(currentCity)) favs.push(currentCity);
    // Save updated favorites list to browser storage
    localStorage.setItem("favs", JSON.stringify(favs));
    // Refresh the favorites display
    renderFavorites();
});

// Display all saved favorite cities as clickable buttons
function renderFavorites() {
    // Retrieve favorites from browser storage
    let favs = JSON.parse(localStorage.getItem("favs")) || [];
    // Start with empty HTML string
    let html = "";
    // Loop through each favorite city and create a clickable element
    favs.forEach(city => {
        html += `<div onclick="loadWeather('${city}')">${city}</div>`;
    });
    // Update the favorites container with the generated HTML
    document.getElementById("favorites").innerHTML = html;
}

// Load and display favorites when page first loads
renderFavorites();

