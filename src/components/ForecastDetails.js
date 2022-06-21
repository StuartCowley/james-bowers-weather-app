import React from "react";
import PropTypes from "prop-types";
import "../styles/ForecastDetails.css";
import WeatherIcon from "react-icons-weather";

function ForecastDetails({ forecast }) {
  const { date, humidity, icon, temperature, wind } = forecast;
  const formattedDate = new Date(date).toDateString().slice(0, 10);
  return (
    <div className="forecast-details__wrapper">
      <div className="forecast-details__left">
        <div className="forecast-details__icon">
          <WeatherIcon name="owm" iconId={icon} />
        </div>
        <div
          className="forecast-details__date"
          data-testid="forecast-details__date"
        >
          {formattedDate}
        </div>
      </div>
      <div className="forecast-details__right">
        <div className="forecast-details__temperature">
          <p className="forecast-details__heading">Temperature</p>
          <p>Max: {temperature.max}°C</p>
          <p>Min: {temperature.min}°C</p>
        </div>
        <div className="forecast-details__humidity">
          <p>Humidity: {humidity}%</p>
        </div>
        <div className="forecast-details__wind">
          <p className="forecast-details__heading">Wind</p>
          <div className="forecast-details__wind-speed">
            <p>Speed: {wind.speed}m/s</p>
          </div>
          <div className="forecast-details__wind-direction">
            <p>Direction: {wind.direction.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForecastDetails;

ForecastDetails.propTypes = {
  forecast: PropTypes.shape({
    date: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    temperature: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number,
      direction: PropTypes.string,
    }).isRequired,
    humidity: PropTypes.number.isRequired,
  }).isRequired,
};
