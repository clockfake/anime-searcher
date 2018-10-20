import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import LoadRing from './LoadRing.jsx';
import { apiLink } from '../constants';

export const CategoryRow = ({ list }) => (
  <ul className="categories__list  col-sm-6">
    {list.map(i => (
      <li key={i.id}>
        <Link to={`/search?${queryString.stringify({ displayMode: 'filter-category', filterText: i.attributes.title, offset: 0 })}`}>{i.attributes.title}</Link>
      </li>
    ))}
  </ul>
);

export default class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: null,
    };
  }

  componentDidMount() {
    (async () => {
      const res = await axios.get(`${apiLink}/categories`, {
        params: {
          sort: '-totalMediaCount',
          'page[limit]': 60,
          'page[offset]': 0,
        },
      });
      this.setState({ fetchedData: res.data });
    })().catch(() => this.setState({ isError: true }));
  }

  render() {
    const { isError, fetchedData } = this.state;
    if (isError) throw new Error('Couldn\'t load Categories tab');
    if (!fetchedData) return <div className="main-section--loading"><LoadRing /></div>;

    return (
      <div className="categories">
        <h4>Popular categories</h4>
        <div className="row no-gutters">
          <CategoryRow list={fetchedData.data.slice(0, 30)} />
          <CategoryRow list={fetchedData.data.slice(30)} />
        </div>
      </div>
    );
  }
}
