import React from 'react';
import MainPageSection from './MainPageSection.jsx';
import 'css/Main.css';
import Categories from './Categories.jsx';

const Main = (props) => {
    return(
    <div className="main row no-gutters">
      <div className="col-md-9">
      <MainPageSection mode='top-airing'/>
      <MainPageSection mode='top-rated'/>
      <MainPageSection mode='top-popular'/>
      </div>
      <Categories/>
    </div>)
}

export default Main;