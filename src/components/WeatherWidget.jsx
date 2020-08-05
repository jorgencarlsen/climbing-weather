import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import config from '../config.json';
import FiveDayForecast from './FiveDayForecast';
import HourlyForecast from './HourlyForecast';

const CurrentWeather = styled.div`
  color: white;
  padding: 20px;
  margin: 20px;
  width: 40%;
  transition: all 5s linear;
  height: 220px;
  transition: all 0.25s ease-out;

  //day gradient
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.2),
    rgba(109, 213, 250, 0.4),
    rgba(41, 128, 185, 0.65)
  );

  //nightgradient
  // background: linear-gradient(
  //   to bottom,
  //   rgba(15, 32, 39, 0.2),
  //   rgba(32, 58, 67, 0.4),
  //   rgba(44, 83, 100, 0.65)
  // );

  box-shadow: 2px 3px 10px 0 rgba(0, 0, 0, 0.2);

  backdrop-filter: blur(3px);

  border-radius: 16px;

  ${(props) => {
    if (props.showForecast) {
      return `
      height: 500px;
    `;
    } else {
      return `
      height: 220px;
      transition: all 0.1s ease-out .1s;
      `;
    }
  }}

  .description {
    text-transform: capitalize;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: -10px 0;

  h2 {
    font-weight: 200;
    font-size: 36px;
  }

  img {
    padding: 0;
    //margin-right: 50px;
    //filter: hue-rotate(50deg) brightness(170%);
  }
`;

const iconUrl = config.iconUrl;

const WeatherWidget = (props) => {
  const [showForecast, setShowForecast] = useState(false);
  const [showHourly, setShowHourly] = useState(false);

  const toggleForecastView = function () {
    setShowForecast(!showForecast);
    if (!showForecast) setShowHourly(false);
  };

  const toggleHourlyView = function () {
    setShowHourly(!showHourly);
    if (!showHourly) setShowForecast(false);
  };

  //Get Data to pass to fiveday forecast and hourly forecast
  const cityName = props.data.name;
  const cityWeatherData = props.data.weather;

  //Get Current Weather Data
  const currentWeather = cityWeatherData.current;
  const latestDate = moment
    .unix(currentWeather.dt)
    .format('dddd, MMMM Do YYYY h:mma');
  const currentWeatherIcon = currentWeather.weather[0].icon;
  const description = currentWeather.weather[0].description;
  const weatherType = currentWeather.weather[0].main;
  const temperature = currentWeather.temp;
  const windDirection = currentWeather.wind_deg;
  const windSpeed = currentWeather.wind_speed;

  ////Get Data to pass to fiveday forecast and hourly forecast
  const forecastData = cityWeatherData.daily;
  const hourlyData = cityWeatherData.hourly;
  hourlyData.forEach((hour) => {
    console.log(moment.unix(hour.dt).format('h:mma'));
  });

  return (
    <CurrentWeather showForecast={showForecast}>
      <div>
        <h1>{cityName}</h1>
        <p>{latestDate}</p>
      </div>
      {console.log(showHourly)}
      <DetailsContainer>
        <img
          className="weather-icon"
          src={iconUrl + currentWeatherIcon + '@2x.png'}
          alt={weatherType}
        />
        <div>
          <h2 className="description">
            {description} {Math.round(temperature)}°
          </h2>
          <p>
            Wind: {windDirection}° at {Math.round(windSpeed)} MPH
          </p>
        </div>
        <button
          className={showHourly ? 'hourly selected' : 'hourly'}
          onClick={toggleHourlyView}
        >
          Hourly
        </button>
        <button
          className={showForecast ? 'forecast selected' : 'forecast'}
          onClick={toggleForecastView}
        >
          Forecast
        </button>
      </DetailsContainer>

      <HourlyForecast data={hourlyData} toggle={showHourly} />
      <FiveDayForecast data={forecastData} toggle={showForecast} />
      {/* {showForecast && <FiveDayForecast data={forecast} />} */}
    </CurrentWeather>
  );
};

export default WeatherWidget;
