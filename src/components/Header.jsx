import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import config from '../config.json';
import '../index.css';
import moment from 'moment';

//API url import
const apiKey = config.openWeatherApiKey;
const apiBase = config.apiBase;
const iconUrl = config.iconUrl;

//Day/Night backrounds
const backgrounds = {
  night: '../static/images/night-mountains.jpg',
  day: '../static/images/mountains.jpg',
};

const ImgContainer = styled.div`
  display: flex;
  flex-flow: column no-wrap;
  align-items: flex-start;
  justify-content: center;
  height: 100vh;
  background-image: 
    linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0,0,0,.1)),
    url(${require('../static/images/mountains.jpg')});
  background-size: cover;
  background-position: center;
  position: relative;
}
`;

const HeaderStyles = styled.div`
  display: flex;
  flex-flow: column;
  ul {
    margin-left: 20px;
  }
`;

const LocationContainer = styled.div`
  color: white;
  padding: 20px;
  margin: 20px;
  //width: 40%;
  height: 300px;
  // background-image: linear-gradient(
  //   to bottom,
  //   rgba(0, 0, 0, 0.1),
  //   rgba(0, 0, 0, 0.3)
  // );

  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(109, 213, 250, 0.5),
    rgba(41, 128, 185, 0.75)
  );

  // background-color: rgba(0, 0, 0, 0.2);

  box-shadow: 2px 3px 10px 0 rgba(0, 0, 0, 0.2);

  border-radius: 16px;

  .description {
    text-transform: capitalize;
  }

  box
`;

class Header extends Component {
  state = {};

  async componentDidMount() {
    const { data } = await axios.get(
      `${apiBase}weather?q=Santa%20Barbara&units=imperial&appid=${apiKey}`
    );
    this.setState({ data });
  }

  render() {
    //return this.renderHelper();
    const { data } = this.state;

    if (!data) {
      return <p>Loading data...</p>;
    }

    const weatherIcon = data.weather[0].icon;
    const weatherType = data.weather[0].description;
    const date = moment.unix(data.dt).format('dddd MMMM Do YYYY h:mma');
    console.log(data);
    return (
      <HeaderStyles>
        <ImgContainer>
          <LocationContainer>
            <h1>{data.name + ', CA'}</h1>
            <p>{date}</p>
            <div>
              <img src={iconUrl + weatherIcon + '@2x.png'} alt={weatherType} />
              <p className="description">{data.weather[0].description}</p>
            </div>
            <ul>
              <li>Weather: {data.weather[0].description}</li>
              <li>Temperature: {Math.round(data.main.temp)}°</li>
              <li>
                Wind: {data.wind.deg} degrees at {Math.round(data.wind.speed)}{' '}
                MPH
              </li>
            </ul>
          </LocationContainer>
        </ImgContainer>
      </HeaderStyles>
    );
  }
}

export default Header;
