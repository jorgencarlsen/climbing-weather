import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import config from '../config.json';
import FiveDayForecast from './FiveDayForecast';

const CurrentWeather = styled.div`
  color: white;
  padding: 20px;
  margin: 20px;
  width: 40%;
  //height: 300px;

  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2),
    rgba(109, 213, 250, 0.4),
    rgba(41, 128, 185, 0.65)
  );

  box-shadow: 2px 3px 10px 0 rgba(0, 0, 0, 0.2);

  backdrop-filter: blur(3px);

  border-radius: 16px;

  .description {
    text-transform: capitalize;
  }
`;

const iconUrl = config.iconUrl;

const WeatherWidget = (props) => {
  const cityName = props.data.name;
  const cityData = props.data.data;

  //Get Current Weather Data
  const currentWeather = cityData.current;
  const latestDate = moment
    .unix(currentWeather.dt)
    .format('dddd MMMM Do YYYY h:mma');
  const currentWeatherIcon = currentWeather.weather[0].icon;
  const description = currentWeather.weather[0].description;
  const weatherType = currentWeather.weather[0].main;
  const temperature = currentWeather.temp;
  const windDirection = currentWeather.wind_deg;
  const windSpeed = currentWeather.wind_speed;

  //get forecast Data
  const forecast = cityData.daily;

  return (
    <CurrentWeather>
      <h1>{cityName + ', CA'}</h1>
      <p>{latestDate}</p>
      <div>
        <img src={iconUrl + currentWeatherIcon + '@2x.png'} alt={weatherType} />
        <p className="description">{description}</p>
      </div>
      <ul>
        <li>Weather: {description}</li>
        <li>Temperature: {Math.round(temperature)}°</li>
        <li>
          Wind: {windDirection} degrees at {Math.round(windSpeed)} MPH
        </li>
      </ul>
      <FiveDayForecast data={forecast} />
    </CurrentWeather>
  );
};

export default WeatherWidget;
