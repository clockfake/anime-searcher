import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleList: null,
      displayMode: '?sort=popularityRank'
    };
  }

  handleSelect(mode) {
    let query;
    switch (mode) {
        case 'top-airing': {query = '?filter[status]=current&sort=popularityRank'; break};
        case 'top-rated': {query = '?sort=ratingRank'; break};
        case 'top-popular' : {query = '?sort=popularityRank'; break};
        default: {query = '?sort=+popularityRank'}
      }
    this.setState({titleList: null, displayMode:query});
  }

  render() {
    if (!this.state.titleList) {
      let fetchdata = new XMLHttpRequest();
      fetchdata.open('get','https://kitsu.io/api/edge/anime' + this.state.displayMode + '&page[limit]=12&fields[anime]=id,posterImage,canonicalTitle');
      const boundSetState = this.setState.bind(this);
      fetchdata.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let result  = JSON.parse(fetchdata.responseText);
        boundSetState({titleList: result});
        }
      };
      fetchdata.send();
      return (<div>App loading</div>)};
    return (
    <div className="main__list">
      <div className="main__button-section">
        <button className="main__button" onClick={() => this.handleSelect('top-airing')}>Top airing</button>
        <button className="main__button" onClick={() => this.handleSelect('top-rated')}>Top rated</button>
        <button className="main__button" onClick={() => this.handleSelect('top-popular')}>Top popular</button>
      </div>
      {this.state.titleList.data.map( (i,index) => {
        return (
        <div key={index} className="main__item">
          <Link to={`/title/${i.id}`}>
            <img src={i.attributes.posterImage.small} alt={i.attributes.canonicalTitle}/>
            <div className="main__desc-wrapper">
              <span className="main__desc">{i.attributes.canonicalTitle}</span>
            </div>
          </Link>
      </div>)})
    }
    </div>
  )
  }
}
