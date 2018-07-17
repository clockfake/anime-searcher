import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: null,
      isError: false
    }
  }

  componentDidMount() {
    fetch(`https://kitsu.io/api/edge/categories?sort=-totalMediaCount&page[limit]=60&page[offset]=0`)
    .then(response => {
    if (response.status!==200) {
      this.setState({isError: true});
      return null;
  } return response.json()}).then(result => this.setState({fetchedData:result}))
    .catch(() => this.setState({isError: true}));
  }

  render() {
    if (this.state.isError) return <div>Error fetching data</div>;
    if (this.state.fetchedData === null) return <div className="main-section--loading"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>;

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
