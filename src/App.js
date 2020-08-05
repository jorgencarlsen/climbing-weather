import React from 'react';
import './index.css';
import Header from './components/Header';
import config from './config.json';

function App() {
  document.title = config.siteTitle;

  return (
    <>
      <Header />
    </>
  );
}

export default App;
