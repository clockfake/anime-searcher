import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import decoder from '../codeQuery.js';
import LoadRing from './LoadRing.jsx';


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
    if (!this.displayMode||!this.offset) throw new Error('Invalid link');
    fetch(`https://kitsu.io/api/edge/anime${decoder(this.displayMode,this.filterText)}&page[limit]=16&page[offset]=${this.offset}&fields[anime]=id,posterImage,titles,canonicalTitle`)
    .then(response => {
    if (response.status!==200) {
      this.setState({isError: true});
      return null;
  } return response.json()}).then(result => this.setState({titleList:result}))
    .catch(() => this.setState({isError: true}));
  }

  componentDidUpdate() {
    const currentOptions = queryString.parse(this.props.location.search);
    if (currentOptions.displayMode !== this.displayMode || currentOptions.offset !== this.offset || currentOptions.filterText !== this.filterText) {
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

  render() {
    if (this.state.isError) throw new Error('Invalid link');
    if (!this.state.titleList) return <div className="main-section--loading"><LoadRing/></div>;

    const prevLink = queryString.stringify({displayMode:this.displayMode,offset:Number(this.offset)-16,filterText:this.filterText});
    const nextLink = queryString.stringify({displayMode:this.displayMode,offset:Number(this.offset)+16,filterText:this.filterText});
    const nextLinkDenial = this.offset >= Number(queryString.parse(this.state.titleList.links.last)['page[offset]']);
    let str;
      switch (this.displayMode) {
        case 'top-airing': str = 'Top airing anime'; break;
        case 'top-rated': str = 'Top rated anime'; break;
        case 'top-popular' : str = 'Top popular anime'; break;
        case 'filter' : str = 'Searching for: «' + this.filterText + '»'; break;
        case 'filter-category' : str = 'Top anime in «' + this.filterText + '» category'; break;
        default: str = 'Anime titles'
      }
    return (
    <div className="main__list">
      <h2>{str}</h2>
      <p>Page {this.offset/16+1}</p>
      <div className="main__button-section">
        <Link to={`/search/?${prevLink}`} onClick={(e) => {if (this.offset<=0) e.preventDefault()}}>
          <button className={`${this.offset <=0 ? 'btn btn-info disabled' : 'btn btn-info'}`}>Prev</button>
        </Link>
        <Link to={`/search/?${nextLink}`} onClick={(e) => {if (nextLinkDenial) e.preventDefault()}}>
        <button className={`${nextLinkDenial ? 'btn btn-info disabled' : 'btn btn-info'}`}>Next</button>
        </Link>
      </div>

      {this.state.titleList.data.map( i => (
        <div key={i.id} className="main__item">
          <Link to={`/title/${i.id}`}>
            <img src={i.attributes.posterImage? i.attributes.posterImage.small : ''} alt={i.attributes.titles.en || i.attributes.canonicalTitle}/>
            <div className="main__desc-wrapper">
              <span className="main__desc">{i.attributes.titles.en || i.attributes.canonicalTitle}</span>
            </div>
          </Link>
      </div>))
      }
    </div>
  )
  }
}
