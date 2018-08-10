import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import LoadRing from '../LoadRing.jsx';
import { apiLink } from '../../constants';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: null
    }
  }

  componentDidMount() {
    fetch(`${apiLink}/categories?sort=-totalMediaCount&page[limit]=60&page[offset]=0`)
    .then(response => {
    if (response.status!==200) {
      this.setState({isError: true});
      return null;
  } return response.json()}).then(result => this.setState({fetchedData:result}))
    .catch(() => this.setState({isError: true}));
  }

  render() {
    if (this.state.isError) throw new Error(`Couldn't load Categories tab`);
    if (this.state.fetchedData === null) return <div className="main-section--loading"><LoadRing/></div>;

    return (
      <div className="col-md-3  categories">
      <h4>Popular categories</h4>
        <div className="row no-gutters">
        <ul className="categories__list  col-sm-6">
          {this.state.fetchedData.data.slice(0,30).map(i =>(
            <li key={i.id}>
              <Link to={'/search?' + queryString.stringify({displayMode:'filter-category',filterText:i.attributes.title,offset:0})}>{i.attributes.title}</Link>
            </li>
          ))}
        </ul>
        <ul className="categories__list  col-sm-6">
          {this.state.fetchedData.data.slice(30).map(i =>(
            <li key={i.id}>
              <Link to={'/search?' + queryString.stringify({displayMode:'filter-category',filterText:i.attributes.title,offset:0})}>{i.attributes.title}</Link>
            </li>
          ))}
        </ul>
        </div>
      </div>
    )
  }
}
