import React from 'react';
import MainPageSection from './MainPageSection.js';
import '../css/Main.css';

export default function Main() {
    return(
    <div className="main">
    <MainPageSection mode='top-airing'/>
    <MainPageSection mode='top-rated'/>
    <MainPageSection mode='top-popular'/>
    </div>)
}
