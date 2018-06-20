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
  }

  componentWillMount() {
    if (!this.displayMode||!this.offset) return;
    let query;
    switch (this.displayMode) {
        case 'top-airing': query = '?filter[status]=current&sort=popularityRank'; break;
        case 'top-rated': query = '?sort=ratingRank'; break;
        case 'top-popular' : query = '?sort=popularityRank'; break;
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
    if (currentOptions.displayMode !== prevOptions.displayMode || currentOptions.offset !== prevOptions.offset) {
      this.displayMode = currentOptions.displayMode;
      this.offset = currentOptions.offset;
      this.setState({titleList: null} );
    }
    if (!this.state.titleList) {
      let query;
      switch (this.displayMode) {
          case 'top-airing': query = '?filter[status]=current&sort=popularityRank'; break;
          case 'top-rated': query = '?sort=ratingRank'; break;
          case 'top-popular' : query = '?sort=popularityRank'; break;
          default: query = '?sort=+popularityRank'
      }
      const boundSetState = this.setState.bind(this);
      let fetchdata = fetch(`https://kitsu.io/api/edge/anime${query}&page[limit]=16&page[offset]=${this.offset}&fields[anime]=id,posterImage,titles,canonicalTitle`);
      fetchdata.then(response => response.json()).then(result => boundSetState({titleList:result}));
    }
  }

  preventPrev(event) {
    if (this.offset <= 0) event.preventDefault();
  }

  preventNext(event) {
    if (this.offset <= 0) event.preventDefault();
    const str = this.state.titleList.links.last;
    if (this.offset === Number(str.slice(str.indexOf('offset%5D')+10,str.indexOf('&sort=')))) event.preventDefault();
  }

  render() {
    if (!this.displayMode||!this.offset) return <div>Error, wrong link</div>;
    if (!this.state.titleList) return <div>App loading</div>;
    return (
    <div className="main__list">
      <div className="main__button-section">
        <Link to={`/search/?displayMode=${this.displayMode}&offset=${Number(this.offset)-16}`} onClick={(e) => this.preventPrev(e)}>
          <button className="main__button">Prev</button>
        </Link>
        <Link to={`/search/?displayMode=${this.displayMode}&offset=${Number(this.offset)+16}`} onClick={(e) => this.preventNext(e)}>
        <button className="main__button">Next</button>
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
