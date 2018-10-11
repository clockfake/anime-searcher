import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import queryString from 'query-string';
import LoadRing from '../LoadRing.jsx';

export default class TitleGenreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedGenres: null,
      isError: false,
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    const { url } = this.props;
    (async () => {
      const res = await axios.get(url);
      this.setState({ fetchedGenres: res.data });
    })().catch(() => this.setState({ isError: true }));
  }

  render() {
    const { isError, fetchedGenres } = this.state;
    if (isError) throw new Error('Couldn\'t load title\'s category list');
    if (!fetchedGenres) return <LoadRing />;
    return (
      <div className="title__categories">
        Categories:
        {fetchedGenres.data.map(genre => (
          <Link
            to={`/search?${queryString.stringify({ displayMode: 'filter-category', filterText: genre.attributes.title, offset: 0 })}`}
            key={genre.id}
            className="btn btn-light title__category"
          >
            {genre.attributes.title}
          </Link>
        ))}
      </div>
    );
  }
}

TitleGenreList.propTypes = {
  url: PropTypes.string,
};

TitleGenreList.defaultProps = {
  url: 'https://kitsu.io/api/edge/anime/439/categories',
};
