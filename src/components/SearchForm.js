import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import decoder from '../codeQuery.js';
import LoadRing from './LoadRing.jsx';
import Pagination from './Pagination.jsx';
import { apiLink } from '../constants';


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
    const request = async () => {
      const res = await axios.get(`${apiLink}/anime${decoder(this.displayMode,this.filterText)}&page[limit]=16&page[offset]=${this.offset}&fields[anime]=id,posterImage,titles,canonicalTitle`);
      this.setState({titleList: res.data});
    }
    request().catch(() => this.setState({isError: true}));
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
      const request = async () => {
        const res = await axios.get(`${apiLink}/anime${decoder(this.displayMode,this.filterText)}&page[limit]=16&page[offset]=${this.offset}&fields[anime]=id,posterImage,titles,canonicalTitle`);
        this.setState({titleList: res.data});
      }
      request().catch(() => this.setState({isError: true}));
    }
  }

  render() {
    if (this.state.isError) throw new Error('Invalid link');
    if (!this.state.titleList) return <div className="main-section--loading"><LoadRing/></div>;
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
      <Pagination
        offset={this.offset}
        displayMode={this.displayMode}
        filterText={this.filterText}
        lastOffset={Number(queryString.parse(this.state.titleList.links.last)['page[offset]'])}
      />
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
