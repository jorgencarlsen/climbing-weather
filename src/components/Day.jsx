import moment from 'moment';
import React from 'react';
import styled from 'styled-components';
import config from '../config.json';

const DayContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  height: 100%;
  img {
    padding: 0;
    margin: -15px 0;
    width: 100%;
    height: auto;
    filter: hue-rotate(50deg) brightness(170%);
  }
`;

const iconUrl = config.iconUrl;

const Day = (props) => {
  const day = props.day;
  //Min
  const minTemp = Math.round(day.temp.min);
  //Max
  const maxTemp = Math.round(day.temp.max);
  //Icon
  const icon = iconUrl + day.weather[0].icon + '@2x.png';
  //Day
  const weekDay = moment.unix(props.day.dt).format('dddd');

  return (
    <DayContainer>
      <p>{weekDay}</p>
      <img src={icon} alt={day.weather[0].main} />
      <p>
        {minTemp} / {maxTemp}°
      </p>
    </DayContainer>
  );
};

export default Day;
