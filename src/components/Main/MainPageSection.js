import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import decoder from 'codeQuery.js';
import LoadRing from '../LoadRing.jsx';
import { apiLink } from '../../constants';

export default class MainPageSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
      fetchedData: null
    }
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    const request = async () => {
      const res = await axios.get(`${apiLink}/anime${decoder(this.props.mode)}&page[limit]=7&page[offset]=0&fields[anime]=id,posterImage,titles,canonicalTitle`);
      this.setState({fetchedData: res.data});
    }
    request().catch(() => this.setState({isError: true}));
  }

  render() {
    if (this.state.isError) throw new Error(`Couldn't load main page section`);
    if (!this.state.fetchedData) return <div className="main-section--loading"><LoadRing/></div>;
    let str;
      switch (this.props.mode) {
        case 'top-airing': str = 'Top airing anime'; break;
        case 'top-rated': str = 'Top rated anime'; break;
        case 'top-popular' : str = 'Top popular anime'; break;
        default: str = 'Anime titles'
      }
      return(
      <div className='main-section'>
        <h4>{str}</h4>
        <div className='main-list-container  row  no-gutters  justify-content-start'>
        {this.state.fetchedData.data.map(i => {
          return (
          <div key={i.id} className="main__item  main__item--small  col">
            <Link to={`/title/${i.id}`}>
              <img src={i.attributes.posterImage.tiny} alt={i.attributes.titles.en || i.attributes.canonicalTitle}/>
              <div className="main__desc-wrapper  main__desc-wrapper--small">
                <span className="main__desc">{i.attributes.titles.en || i.attributes.canonicalTitle}</span>
              </div>
            </Link>
        </div>)})
        }
        </div>
        <Link to={`/search?displayMode=${this.props.mode}&offset=0`}>
          Search more titles
        </Link>
      </div>
    )
  }
}
