import React from "react";
import PropTypes from "prop-types";
import WeatherIcon from "react-icons-weather";

function ForecastSummary(props) {
  const { date, description, icon, temperature } = props;
  const formattedDate = new Date(date).toDateString().slice(0, 10);
  return (
    <div className="forecast-summary" data-testid="forecast-summary">
      <div className="forecast-summary__date">{formattedDate}</div>
      <div className="forecast-summary__icon" data-testid="forecast-icon">
        <WeatherIcon name="owm" iconId={icon} />
      </div>
      <div className="forecast-summary__maxTemp">
        <p className="forecast-summary__maxTemp">{temperature.max}°C</p>
      </div>
      <div className="forecast-summary__description">{description}</div>
    </div>
  );
}

ForecastSummary.propTypes = {
  date: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  temperature: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number,
  }).isRequired,
};

export default ForecastSummary;
