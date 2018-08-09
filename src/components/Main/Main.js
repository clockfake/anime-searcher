import React from 'react';
import MainPageSection from './MainPageSection.js';
import 'css/Main.css';
import Categories from './Categories.jsx';

const Main = (props) => {
    return(
    <div className="main row no-gutters">
      <div className="col-md-9">
      <MainPageSection mode='top-airing' {...props}/>
      <MainPageSection mode='top-rated' {...props}/>
      <MainPageSection mode='top-popular' {...props}/>
      </div>
      <Categories/>
    </div>)
}

export default Main;
