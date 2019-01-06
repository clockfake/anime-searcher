// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import axios from 'axios';
import {
  apiLink,
  decoder,
  pageLimit,
  headerDecoder,
} from '../../constants.js';
import LoadRing from '../LoadRing.jsx';
import Pagination from './Pagination.jsx';
import type { Title } from '../../constants';

type WrappedTitles = {
  data: Array<Title>,
  meta: {
    count: number,
  },
};

type Props = {
  location: {
    search: string,
  },
};

type State = {
  titleList: ?WrappedTitles,
  isError: boolean,
};

export default class SearchForm extends Component<Props, State> {
  displayMode: string; // eslint-disable-line
  offset: number;      // eslint-disable-line
  filterText: string;  // eslint-disable-line

  constructor(props: Props) {
    super(props);
    this.state = {
      titleList: null,
      isError: false,
    };
    const { location: { search } } = this.props;
    const loadOptions = queryString.parse(search);
    this.displayMode = loadOptions.displayMode || 'top-rated';
    this.offset = (loadOptions.offset && Number(loadOptions.offset)) || 0;
    this.filterText = loadOptions.filterText;
  }

  componentDidMount() {
    this.request();
  }

  componentDidUpdate() {
    const { location: { search } } = this.props;
    const currentOptions = queryString.parse(search);
    if (currentOptions.displayMode !== this.displayMode
      || Number(currentOptions.offset) !== this.offset
      || currentOptions.filterText !== this.filterText
    ) {
      this.displayMode = currentOptions.displayMode;
      this.offset = Number(currentOptions.offset);
      this.filterText = currentOptions.filterText;
      this.request();
    }
  }

  request = async () => {
    try {
      this.setState({ titleList: null });
      const res = await axios.get(`${apiLink}/anime${decoder(this.displayMode, this.filterText)}&page[limit]=${pageLimit}&page[offset]=${this.offset * pageLimit}&fields[anime]=id,posterImage,titles,canonicalTitle`);
      this.setState({ titleList: res.data });
    } catch (err) {
      this.setState({ isError: true });
    }
  }

  render() {
    const { isError, titleList } = this.state;
    if (isError) throw new Error('Invalid link');
    if (!titleList) return <div className="main-section--loading"><LoadRing /></div>;
    const str = headerDecoder(this.displayMode, this.filterText);

    return (
      <div className="main__list">
        <h2>{str}</h2>
        <Pagination
          offset={Number(this.offset)}
          displayMode={this.displayMode}
          filterText={this.filterText}
          count={titleList.meta.count}
          limit={16}
        />
        {titleList.data.map(i => (
          <div key={i.id} className="main__item">
            <Link to={`/title/${i.id}`}>
              <img src={i.attributes.posterImage ? i.attributes.posterImage.small : ''} alt={i.attributes.titles.en || i.attributes.canonicalTitle} />
              <div className="main__desc-wrapper">
                <span className="main__desc">{i.attributes.titles.en || i.attributes.canonicalTitle}</span>
              </div>
            </Link>
          </div>
        ))}
        <Pagination
          offset={Number(this.offset)}
          displayMode={this.displayMode}
          filterText={this.filterText}
          count={Number(titleList.meta.count)}
          limit={16}
        />
      </div>
    );
  }
}

SearchForm.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};
