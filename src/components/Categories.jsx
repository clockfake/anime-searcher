// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import LoadRing from './LoadRing.jsx';
import { apiLink } from '../constants';

type Category = {
  id: string,
  attributes: {
    title: string,
  },
};

export const CategoryRow = ({ list }: { list: Array<Category> }) => (
  <ul className="categories__list  col-sm-6">
    {list.map(i => (
      <li key={i.id}>
        <Link to={`/search?${queryString.stringify(
          { displayMode: 'filter-category',
          filterText: i.attributes.title, offset: 0
        })}`}
        >
          {i.attributes.title}
        </Link>
      </li>
    ))}
  </ul>
);

type Props = {};
type State = {
  fetchedData: ?Array<Category>,
  isError: boolean,
};

export default class Categories extends Component<Props, State> {
  state = {
    fetchedData: null,
    isError: false,
  };

  request = async () => {
    const res = await axios.get(`${apiLink}/categories`, {
      params: {
        sort: '-totalMediaCount',
        'page[limit]': 60,
        'page[offset]': 0,
      },
    });
    this.setState({ fetchedData: res.data.data });
  }

  componentDidMount() {
    try {
      this.request();
    } catch(err) {
      this.setState({ isError: true });
    }
  }

  render() {
    const { isError, fetchedData } = this.state;
    if (isError) throw new Error('Couldn\'t load Categories tab');
    if (!fetchedData) return <div className="main-section--loading"><LoadRing /></div>;

    return (
      <div className="categories">
        <h4>Popular categories</h4>
        <div className="row no-gutters">
          <CategoryRow list={fetchedData.slice(0, 30)} />
          <CategoryRow list={fetchedData.slice(30)} />
        </div>
      </div>
    );
  }
}
