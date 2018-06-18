import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class SearchPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: null,
      prevInput: ''
    };
  }

  onLinkClick() {
    this.props.onLinkClick()
  }

  render() {
    if (this.props.input.length<3) return <ul className="search__popup-list--empty"></ul>;
    if (this.props.input !== this.state.prevInput) {
      this.setState({fetchedData: null, prevInput: this.props.input});
      return <ul className="search__popup-list--empty"></ul>
    }
    if (!this.state.fetchedData) {
      const boundSetState = this.setState.bind(this);
      let fetchdata = fetch('https://kitsu.io/api/edge/anime?filter[text]=' + this.props.input + '&page[limit]=5');
      fetchdata.then(response => response.json()).then(result => boundSetState({fetchedData:result}));
      return (<div className="search__popup-loading">Loading</div>);
    };
    return (<ul className="search__popup-list">
      {this.state.fetchedData.data.map((i,index) => {
        return (
          <li key={index} className="search__popup-item"><Link to={`/title/${i.id}`} onClick={this.onLinkClick}>{i.attributes.titles.en || i.attributes.canonicalTitle}</Link></li>
        )
      })}
      </ul>)
  }
}
