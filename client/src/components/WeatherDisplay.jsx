import React from 'react';
import './WeatherDisplay.css';

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div>
          <h2>Current Weather</h2>
          <p className="season-badge">{weather.season}</p>
        </div>
        <img src={iconUrl} alt={weather.condition} className="weather-icon" />
      </div>
      
      <div className="weather-main">
        <h1 className="temp">{Math.round(weather.temp)}°</h1>
        <p className="condition">{weather.description}</p>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span>Feels Like</span>
          <strong>{Math.round(weather.feelsLike)}°</strong>
        </div>
        <div className="detail-item">
          <span>Humidity</span>
          <strong>{weather.humidity}%</strong>
        </div>
        <div className="detail-item">
          <span>Wind</span>
          <strong>{weather.windSpeed} m/s</strong>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;