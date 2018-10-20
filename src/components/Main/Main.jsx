import React from 'react';
import MainPageSection from './MainPageSection.jsx';
import 'css/Main.css';

const Main = () => (
  <div>
    <MainPageSection mode="top-airing" />
    <MainPageSection mode="top-rated" />
    <MainPageSection mode="top-popular" />
  </div>
);

export default Main;
