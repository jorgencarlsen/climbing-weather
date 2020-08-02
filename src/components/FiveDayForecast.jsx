import React, { Component } from 'react';
import styled from 'styled-components';
import Day from './Day';

const ForecastWeather = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  color: white;
  width: 100%;
  }
`;

const FiveDayForecast = (props) => {
  const fiveDays = props.data.slice(0, 5);

  return (
    <ForecastWeather>
      {fiveDays.map((day) => {
        return <Day key={day.dt} day={day} />;
      })}
    </ForecastWeather>
  );
};

export default FiveDayForecast;
