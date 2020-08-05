import React from 'react';
import styled from 'styled-components';
import Day from './Day';

const ForecastWeather = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  color: white;
  width: 100%;
  opacity: 0;
  transition: all 0.4s ease-out;

  ${(props) => {
    if (props.toggle) {
      return `
    opacity: 1;
    `;
    } else {
      return `
      opactiy: 0;
      transition: all 0.2s ease-in;
      `;
    }
  }}
`;

const HourlyForecast = (props) => {
  //Only display first 5 days of the forecast
  const fiveDays = props.data.slice(1, 6);
  return (
    <ForecastWeather toggle={props.toggle}>
      {fiveDays.map((day) => {
        return <Day key={day.dt} day={day} />;
      })}
    </ForecastWeather>
  );
};

export default HourlyForecast;
