import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleList: null
    };
    const loadOptions = queryString.parse(this.props.location.search);
    this.displayMode = loadOptions.displayMode? loadOptions.displayMode : null;
    this.offset = loadOptions.offset? loadOptions.offset : null;
    this.filterText = loadOptions.filterText ? loadOptions.filterText : null;
  }

  componentWillMount() {
    if (!this.displayMode||!this.offset) return;
    let query;
    switch (this.displayMode) {
        case 'top-airing': query = '?filter[status]=current&sort=popularityRank'; break;
        case 'top-rated': query = '?sort=ratingRank'; break;
        case 'top-popular' : query = '?sort=popularityRank'; break;
        case 'filter' : query='?filter[text]=' + this.filterText; break;
        default: query = '?sort=+popularityRank'
      }
    const boundSetState = this.setState.bind(this);
    let fetchdata = fetch(`https://kitsu.io/api/edge/anime${query}&page[limit]=16&page[offset]=${this.offset}&fields[anime]=id,posterImage,titles,canonicalTitle`);
    fetchdata.then(response => response.json()).then(result => boundSetState({titleList:result}));
  }

  componentDidUpdate(prevProps) {
    const currentOptions = queryString.parse(this.props.location.search);
    const prevOptions = queryString.parse(prevProps.location.search);
    if (!currentOptions.displayMode||!currentOptions.offset||!prevOptions.displayMode||!prevOptions.offset) return;
    if (currentOptions.displayMode !== prevOptions.displayMode || currentOptions.offset !== prevOptions.offset || currentOptions.filterText !== prevOptions.filterText) {
      this.displayMode = currentOptions.displayMode;
      this.offset = currentOptions.offset;
      this.filterText = currentOptions.filterText ? currentOptions.filterText : null;
      this.setState({titleList: null} );
    }
    if (!this.state.titleList) {
      let query;
      switch (this.displayMode) {
          case 'top-airing': query = '?filter[status]=current&sort=popularityRank'; break;
          case 'top-rated': query = '?sort=ratingRank'; break;
          case 'top-popular' : query = '?sort=popularityRank'; break;
          case 'filter' : query='?filter[text]=' + this.filterText; break;
          default: query = '?sort=popularityRank'
      }
      const boundSetState = this.setState.bind(this);
      fetch(`https://kitsu.io/api/edge/anime${query}&page[limit]=16&page[offset]=${this.offset}&fields[anime]=id,posterImage,titles,canonicalTitle`)
        .then(response => response.json()).then(result => boundSetState({titleList:result}));
    }
  }

  preventPrev(event) {
    if (this.offset <= 0) event.preventDefault();
  }

  preventNext(event) {
    const str = this.state.titleList.links.last;
    if (this.offset === Number(str.slice(str.indexOf('offset%5D')+10,str.indexOf('&sort=')))) event.preventDefault();
  }

  render() {
    if (!this.displayMode||!this.offset) return <div>Error, wrong link</div>;
    if (!this.state.titleList) return <div>App loading</div>;

    const prevLink = queryString.stringify({displayMode:this.displayMode,offset:Number(this.offset)-16,filterText:this.filterText});
    const nextLink = queryString.stringify({displayMode:this.displayMode,offset:Number(this.offset)+16,filterText:this.filterText});
    let str;
      switch (this.displayMode) {
        case 'top-airing': str = 'Top airing anime'; break;
        case 'top-rated': str = 'Top rated anime'; break;
        case 'top-popular' : str = 'Top popular anime'; break;
        case 'filter' : str = 'Searching for: «' + this.filterText + '»'; break;
        default: str = 'Anime titles'
      }
    return (
    <div className="main__list">
      <h2>{str}</h2>
      <p>Page {this.offset/16+1}</p>
      <div className="main__button-section">
        <Link to={`/search/?${prevLink}`} onClick={(e) => this.preventPrev(e)}>
          <button className="btn btn-info">Prev</button>
        </Link>
        <Link to={`/search/?${nextLink}`} onClick={(e) => this.preventNext(e)}>
        <button className="btn btn-info">Next</button>
        </Link>
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
