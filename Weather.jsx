import { useState } from "react";
import { getWeather } from "./api";
import "./App.css";

function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleGetWeather = async () => {
    if (!city) {
      setError("Please enter a city");
      return;
    }

    try {
      setError("");

      const response = await getWeather(city);
      setData(response.data);
    } catch (err) {
      setError("City not found");
      setData(null);
    }
  };

  let weatherImage = "";

  if (data) {
    const condition = data.weather[0].main;

    if (condition === "Sunny") {
      weatherImage = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; 
    } else if (condition === "Clouds") {
      weatherImage = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; 
    } else if (condition === "Rain") {
      weatherImage =
        "https://www.freepnglogos.com/uploads/rain-png/cloud-rain-sky-transparent-picture-12.png"; 
    } else if (condition === "Clear") {
      weatherImage =
        "https://cdn-icons-png.flaticon.com/512/3222/3222807.png"; 
    } else {
      weatherImage = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; 
    }
  }

  return (
    <div className="MainContainer">
      <div className="Main-InputBox">
        <input
          className="inputBox"
          type="text"
          placeholder="Enter a city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button className="Btn-Input" onClick={handleGetWeather}>
          Get Weather
        </button>
      </div>
      {error && <p className="error" style={{ color: "red" }}>{error}</p>}

      {data && (
        <>
          <div className="container1">
            <div className="Icons">
              <img src={weatherImage} alt="weather icon" width="140" />{" "}
            </div>
            <div>
              <h6>Today</h6>
              <h3>{data.name}</h3>
              <p>Temperature: {data.main.temp}°C</p>
              <p>Weather: {data.weather[0].main}</p>
            </div>
          </div>

          <div className="SmallBoxesAll">
            <div className="SmallBox">Speed: {data.wind.speed}m/s</div>
            <div className="SmallBox">Pressure: {data.main.pressure}HPA</div>
            <div className="SmallBox">Humidity: {data.main.humidity}%</div>
            <div className="SmallBox">
              Feels like: {data.main.feels_like} °C
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
