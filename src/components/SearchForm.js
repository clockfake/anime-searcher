import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import decoder from '../codeQuery.js';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleList: null,
      isError: false
    };
    this.setState = this.setState.bind(this);
    const loadOptions = queryString.parse(this.props.location.search);
    this.displayMode = loadOptions.displayMode && loadOptions.displayMode;
    this.offset = loadOptions.offset && loadOptions.offset;
    this.filterText = loadOptions.filterText && loadOptions.filterText;
  }

  componentDidMount() {
    if (!this.displayMode||!this.offset) return;
    fetch(`https://kitsu.io/api/edge/anime${decoder(this.displayMode,this.filterText)}&page[limit]=16&page[offset]=${this.offset}&fields[anime]=id,posterImage,titles,canonicalTitle`)
    .then(response => {
    if (response.status!==200) {
      this.setState({isError: true});
      return null;
  } return response.json()}).then(result => this.setState({titleList:result}))
    .catch(() => this.setState({isError: true}));
  }

  componentDidUpdate(prevProps) {
    const currentOptions = queryString.parse(this.props.location.search);
    const prevOptions = queryString.parse(prevProps.location.search);
    if (currentOptions.displayMode !== prevOptions.displayMode || currentOptions.offset !== prevOptions.offset || currentOptions.filterText !== prevOptions.filterText) {
      this.displayMode = currentOptions.displayMode;
      this.offset = currentOptions.offset;
      this.filterText = currentOptions.filterText && currentOptions.filterText;
      this.setState({titleList: null});
    }
    if (!this.state.titleList) {
      fetch(`https://kitsu.io/api/edge/anime${decoder(this.displayMode,this.filterText)}&page[limit]=16&page[offset]=${this.offset}&fields[anime]=id,posterImage,titles,canonicalTitle`)
        .then(response => {
        if (response.status!==200) {
          this.setState({isError: true});
          return null;
      } return response.json()}).then(result => this.setState({titleList:result}))
      .catch(() => this.setState({isError: true}));
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
    if (this.state.isError) return <div>Error, wrong link</div>;
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

      {this.state.titleList.data.map( (i) => {
        return (
        <div key={i.id} className="main__item">
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
