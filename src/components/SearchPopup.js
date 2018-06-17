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

  render() {
    if (this.props.input.length<3) return <ul></ul>;
    if (this.props.input !== this.state.prevInput) {
      this.setState({fetchedData: null, prevInput: this.props.input});
      return <ul></ul>
    }
    if (!this.state.fetchedData) {
      let fetchdata = new XMLHttpRequest();
      fetchdata.open('get','https://kitsu.io/api/edge/anime?filter[text]=' + this.props.input + '&page[limit]=5');
      const boundSetState = this.setState.bind(this);
      fetchdata.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let result  = JSON.parse(fetchdata.responseText);
        boundSetState({fetchedData: result});
        }
      };
      fetchdata.send();
      return (<div>Loading</div>);
    };
    return (<ul>
      {this.state.fetchedData.data.map((i,index) => {
        return (
          <li key={index}><Link to={`/title/${i.id}`}>{i.attributes.canonicalTitle}</Link></li>
        )
      })}
      </ul>)
  }
}
