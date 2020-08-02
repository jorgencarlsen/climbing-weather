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

  .description {
    text-transform: capitalize;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  margin: -10px 0;

  h2 {
    font-weight: 200;
    font-size: 36px;
  }

  img {
    padding: 0;
    margin-right: 50px;
    filter: hue-rotate(50deg) brightness(170%);
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
    .format('dddd, MMMM Do YYYY h:mma');
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
      <div>
        <h1>{cityName}</h1>
        <p>{latestDate}</p>
      </div>

      <DetailsContainer>
        <img src={iconUrl + currentWeatherIcon + '@2x.png'} alt={weatherType} />
        <div>
          <h2 className="description">
            {description} {Math.round(temperature)}°
          </h2>
          <p>
            Wind: {windDirection}° at {Math.round(windSpeed)} MPH
          </p>
        </div>
      </DetailsContainer>

      <FiveDayForecast data={forecast} />
    </CurrentWeather>
  );
};

export default WeatherWidget;
