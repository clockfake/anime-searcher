import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleList: null,
      displayMode: 'top-popular',
      offset: 0
    };
  }

  componentWillMount() {
    let query;
    switch (this.state.displayMode) {
        case 'top-airing': {query = '?filter[status]=current&sort=popularityRank'; break};
        case 'top-rated': {query = '?sort=ratingRank'; break};
        case 'top-popular' : {query = '?sort=popularityRank'; break};
        default: {query = '?sort=+popularityRank'}
      }
    const boundSetState = this.setState.bind(this);
    let fetchdata = fetch(`https://kitsu.io/api/edge/anime${query}&page[limit]=12&page[offset]=${this.state.offset}&fields[anime]=id,posterImage,titles,canonicalTitle`);
    fetchdata.then(response => response.json()).then(result => boundSetState({titleList:result}));
  }

  componentDidUpdate() {
    if (!this.state.titleList) {
      let query;
      switch (this.state.displayMode) {
          case 'top-airing': {query = '?filter[status]=current&sort=popularityRank'; break};
          case 'top-rated': {query = '?sort=ratingRank'; break};
          case 'top-popular' : {query = '?sort=popularityRank'; break};
          default: {query = '?sort=+popularityRank'}
        }
      const boundSetState = this.setState.bind(this);
      let fetchdata = fetch(`https://kitsu.io/api/edge/anime${query}&page[limit]=12&page[offset]=${this.state.offset}&fields[anime]=id,posterImage,titles,canonicalTitle`);
      fetchdata.then(response => response.json()).then(result => boundSetState({titleList:result}));
    };
  }

  handleSelect(mode) {
    if (mode !== this.state.displayMode) this.setState({titleList: null, displayMode:mode, offset:0});
  }
  handleChangeOffset(change) {
    if (change ==='-') this.setState((prevState) => ({titleList: null, offset: prevState.offset-12}));
    if (change ==='+') this.setState((prevState) => ({titleList: null, offset: prevState.offset+12}));
  }

  render() {
    if (!this.state.titleList) return <div>App loading</div>;
    const str = this.state.titleList.links.last;
    return (
    <div className="main__list">
      <div className="main__button-section">
        <button className="main__button" disabled={this.state.offset === 0} onClick={() => this.handleChangeOffset('-')}>Prev</button>
        <button className="main__button" disabled={this.state.displayMode === 'top-airing'} onClick={() => this.handleSelect('top-airing')}>Top airing</button>
        <button className="main__button" disabled={this.state.displayMode === 'top-rated'} onClick={() => this.handleSelect('top-rated')}>Top rated</button>
        <button className="main__button" disabled={this.state.displayMode === 'top-popular'} onClick={() => this.handleSelect('top-popular')}>Top popular</button>
        <button className="main__button"
          disabled={this.state.offset == Number(str.slice(str.indexOf('offset%5D')+10,str.indexOf('&sort=')))}
          onClick={() => this.handleChangeOffset('+')}>Next</button>
      </div>
      {this.state.titleList.data.map( (i,index) => {
        return (
        <div key={index} className="main__item">
          <Link to={`/title/${i.id}`}>
            <img src={i.attributes.posterImage.small} alt={i.attributes.titles.en || i.attributes.canonicalTitle}/>
            <div className="main__desc-wrapper">
              <span className="main__desc">{i.attributes.titles.en || i.attributes.canonicalTitle}</span>
            </div>
          </Link>
      </div>)})
    }
    </div>
  )
  }
}
