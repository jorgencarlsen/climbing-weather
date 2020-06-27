import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import config from '../config.json';
import '../index.css';

const apiKey = config.openWeatherApiKey;

const ImgContainer = styled.div`
  height: 75vh;
  background-image: url(${require('../static/images/mountains.jpg')});
  background-size: cover;
  background-position: center;
  position: relative;
  margin-bottom: 20px;
}
`;

const HeaderStyles = styled.div`
  display: flex;
  flex-flow: column;
  ul {
    margin-left: 20px;
  }
`;

class Header extends Component {
  state = {};

  async componentDidMount() {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=Bishop&units=imperial&appid=${apiKey}`
    );
    this.setState({ data });
  }

  render() {
    //return this.renderHelper();
    const { data } = this.state;
    if (!data) {
      return <p>Loading data...</p>;
    }
    return (
      <HeaderStyles>
        <ImgContainer />
        <h1>Climbing Weather</h1>
        <p>This weeks forecast in {data.name}</p>
        <ul>
          <li>Weather: {data.weather[0].description}</li>
          <li>Temperature: {data.main.temp}</li>
          <li>
            Wind: {data.wind.deg} degrees at {data.wind.speed} MPH
          </li>
        </ul>
      </HeaderStyles>
    );
  }
}

export default Header;
