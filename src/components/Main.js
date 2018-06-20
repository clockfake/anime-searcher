import React, { Component } from 'react';
import MainPageSection from './MainPageSection.js';

export default class Main extends Component {
  render() {
    return(
    <div className="main">
    <MainPageSection mode='top-airing'/>
    <MainPageSection mode='top-rated'/>
    <MainPageSection mode='top-popular'/>
    </div>)
  }
}
