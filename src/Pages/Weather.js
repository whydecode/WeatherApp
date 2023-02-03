import React, { useState } from "react";
import "./Weather.css";
const APIKEY = "42645a871a07b00a2f44c73863474fa9";
function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [isCity, setIsCity] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(city === ""){
        return;
    }
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
    );
    const data = await response.json();
    setWeather(data);
    setIsCity(true);
  };
  const handleReset = () => {
    setCity("");
    setIsCity(false);
  };
  return (
    <div className="weather">
      <div className="home" style={{ display: isCity ? "none" : "flex" }}>
        <form onSubmit={handleSubmit}>
          <h1>Weather</h1>
          <label>
            <input
              placeholder="City Name"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div style={{ display: isCity ? "block" : "none" }}>
        {weather.name && (
          <div>
            <p>City: {weather.name}</p>
            <p>Temperature: {Math.floor(weather.main.temp - 273)}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <button type="reset" onClick={handleReset}>
              Reset
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
