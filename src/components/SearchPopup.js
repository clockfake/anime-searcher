import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

export default class SearchPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.input.length<3) return;
    if (this.props.input !== prevProps.input) {
      this.setState({fetchedData: null});
      return;
    }
    if (!this.state.fetchedData) {
      const boundSetState = this.setState.bind(this);
      let fetchdata = fetch('https://kitsu.io/api/edge/anime?filter[text]=' + this.props.input + '&page[limit]=5&fields[anime]=id,titles,canonicalTitle,showType');
      fetchdata.then(response => response.json()).then(result => boundSetState({fetchedData:result}));
    }
  }

  render() {
    if (this.props.input.length<3) return <ul className="search__popup-list--empty"></ul>;
    if (!this.state.fetchedData) {
      return (<div className="search__popup-loading">Loading</div>);
    };
    const searchLink = '/search?' + queryString.stringify({displayMode:'filter',filterText:this.props.input,offset:0});
    return (<ul className="search__popup-list">
      {this.state.fetchedData.data.map((i,index) => {
        return (
          <li key={index} className="search__popup-item  list-group-item">
            <Link className="search__item-info-wrapper" to={`/title/${i.id}`}>
            <span>{i.attributes.titles.en || i.attributes.canonicalTitle}</span>
            <span className="badge badge-secondary">{i.attributes.showType}</span></Link>
          </li>
        )
      })}
      <li className="search__popup-to-form  list-group-item">
        <Link to={searchLink}>More results</Link>
      </li>
      </ul>)
  }
}
