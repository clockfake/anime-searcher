import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

export default class SearchPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: null,
      isError: false
    };
    this.setState = this.setState.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.input.length<3) return;
    if (this.props.input !== prevProps.input) {
      this.setState({fetchedData: null});
    }
    if (!this.state.fetchedData) {
      fetch(`https://kitsu.io/api/edge/anime?filter[text]=${this.props.input}&page[limit]=5&fields[anime]=id,titles,canonicalTitle,showType`)
        .then(response => {
        if (response.status!==200) {
          this.setState({isError: true});
          return null;
      } return response.json()}).then(result => this.setState({fetchedData:result}))
        .catch(() => this.setState({isError:true}));
    }
  }

  render() {
    if (this.props.input.length<3) return <ul className="search__popup-list--empty"></ul>;
    if (this.state.isError) return <div className="search__popup-loading">Error</div>;
    if (!this.state.fetchedData) return <div className="search__popup-loading"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>;
    if (this.state.fetchedData && !this.state.fetchedData.data.length) {
      return <div className="search__popup-loading">No results</div>;
    };
    const searchLink = '/search?' + queryString.stringify({displayMode:'filter',filterText:this.props.input,offset:0});
    return (<ul className="search__popup-list">
      {this.state.fetchedData.data.map(i => (
          <li key={i.id} className="search__popup-item  list-group-item">
            <Link className="search__item-info-wrapper" to={`/title/${i.id}`}>
            <span>{i.attributes.titles.en || i.attributes.canonicalTitle}</span>
            <span className="badge badge-secondary">{i.attributes.showType}</span></Link>
          </li>
        )
      )}
      <li className="search__popup-to-form  list-group-item">
        <Link to={searchLink}>More results</Link>
      </li>
      </ul>)
  }
}
