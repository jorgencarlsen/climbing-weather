import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import config from '../config.json';
import '../index.css';
import WeatherWidget from './WeatherWidget';

//API url import
const googleApiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
const apiBase = config.apiBase;
const iconUrl = config.iconUrl;

//Day/Night backrounds
const backgrounds = {
  night: '../static/images/night-mountains.jpg',
  day: '../static/images/mountains.jpg',
};

//cities
const cities = [
  'Santa Barbara',
  'Bishop',
  'Joshua Tree',
  'Yosemite',
  'Tuolumne Meadows',
  'San Francisco',
];

//get lat and long coordinates from city name
async function getCoordinates(data) {
  const encoded = encodeURI(data);

  const googleGeoCodingApiBase = config.googleGeoCodingApiBase;

  const apiData = await axios.get(
    `${googleGeoCodingApiBase}${encoded}&key=${googleApiKey}`
  );

  const returnObject = apiData.data.results[0].geometry.location;

  if (!apiData) return console.log('Could not find location');

  //return apiData;
  return returnObject;
}

const ImgContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-image: 
    linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0,0,0,.1)),
    url(${require('../static/images/mountains.jpg')});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  overflow: scroll;
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
  state = {
    cityData: [],
  };

  async componentDidMount() {
    const cityData = await Promise.all(
      cities.map((city) => this.createCitiesObj(city))
    );

    this.setState({ cityData });
  }

  createCitiesObj = async (city) => {
    const { lat, lng } = await getCoordinates(city);

    const { data } = await axios.get(
      `${apiBase}onecall?lat=${lat}&lon=${lng}&units=imperial&appid=${apiKey}`
    );

    const cityObject = { name: city, data };
    return cityObject;
  };

  render() {
    //return this.renderHelper();
    const cityData = this.state.cityData;

    if (cityData.length === 0) {
      return <p>Loading data...</p>;
    }

    //const firstCity = cityData;

    // const weatherIcon = data.weather[0].icon;
    // const weatherType = data.weather[0].description;
    // const date = moment.unix(data.dt).format('dddd MMMM Do YYYY h:mma');
    return (
      <HeaderStyles>
        <ImgContainer>
          {cityData.map((city) => (
            <WeatherWidget key={city.name} data={city} />
          ))}
        </ImgContainer>
      </HeaderStyles>
    );
  }
}

export default Header;
