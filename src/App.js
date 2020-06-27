import React from 'react';
import './index.css';
import axios from 'axios';
import config from './config.json';
import Header from './components/Header';

const apiKey = config.openWeatherApiKey;

// async function getData() {
//   const response = await axios.get(
//     `http://api.openweathermap.org/data/2.5/weather?q=Bishop&units=imperial&appid=${apiKey}`
//   );

//   return response;
// }

//const data = getData();

function App() {
  return (
    <>
      <Header />
    </>
  );
}

export default App;
