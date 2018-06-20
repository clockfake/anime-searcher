import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class MainPageSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: null
    }
  }

  componentWillMount() {
    let query;
      switch (this.props.mode) {
        case 'top-airing': query = '?filter[status]=current&sort=popularityRank'; break;
        case 'top-rated': query = '?sort=ratingRank'; break;
        case 'top-popular' : query = '?sort=popularityRank'; break;
        default: query = '?sort=+popularityRank'
      }
    const boundSetState = this.setState.bind(this);
    let fetchdata = fetch(`https://kitsu.io/api/edge/anime${query}&page[limit]=8&page[offset]=0&fields[anime]=id,posterImage,titles,canonicalTitle`);
    fetchdata.then(response => response.json()).then(result => boundSetState({fetchedData:result}));
  }

  render() {
    let str;
      switch (this.props.mode) {
        case 'top-airing': str = 'Top airing anime'; break;
        case 'top-rated': str = 'Top rated anime of all time'; break;
        case 'top-popular' : str = 'The most popular anime'; break;
        default: str = 'The most popular anime'
      }
    if (!this.state.fetchedData) return <div>Loading</div>;
    return(
      <div className='main-section'>
        <h3>{str}</h3>
        <div className='main-list-container'>
        {this.state.fetchedData.data.map( (i,index) => {
          return (
          <div key={index} className="main__item  main__item--small">
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
