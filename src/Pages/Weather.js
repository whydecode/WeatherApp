import React, { useState } from "react";
import "./Weather.css";
const APIKEY = "42645a871a07b00a2f44c73863474fa9";
function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (city === "") {
      return;
    }
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
    );
    const data = await response.json();
    setWeather(data);
  };

  return (
    <div className="weather">
      <div className="home">
        <form onSubmit={handleSubmit}>
          <h1>Weather</h1>
          <label>
            <input
              placeholder="City Name"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button type="submit">Search</button>
          </label>
        </form>
      </div>
      <div>
        {weather.name && (
          <div className="weatherCard">
            <h3>{weather.name}</h3>
            <span>{weather.weather[0].description}</span>
            <br />
            <p>
              <img
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt=""
              />
            </p>
            <div className="data">
              <div className="temp">
                Temperature: <br />{" "}
                <span>{Math.floor(weather?.main?.temp - 273)}°C</span>
              </div>
              <div className="wind">
                Wind: <br /> <span>{weather?.wind?.speed}Km/h</span>
              </div>
              <div className="humidity">
                Humidity: <br /> <span>{weather?.main?.humidity}%</span>
              </div>
              <div className="visibility">
                Visibility: <br /> <span>{weather?.visibility} Km</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
