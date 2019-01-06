// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadRing from '../LoadRing.jsx';
import { apiLink, decoder, headerDecoder } from '../../constants';
import type { Title } from '../../constants';

type Props = {
  mode: string,
};

type State = {
  isError: boolean,
  fetchedData: ?Array<Title>,
}

export default class MainPageSection extends Component<Props, State> {
  static defaultProps = {
    mode: 'top-rated',
  };
  
  constructor(props: Props) {
    super(props);
    this.state = {
      isError: false,
      fetchedData: null,
    };
  }

  componentDidMount() {
    const { mode } = this.props;
    (async () => {
      const res = await axios.get(`${apiLink}/anime${decoder(mode)}&page[limit]=9&page[offset]=0&fields[anime]=id,posterImage,titles,canonicalTitle`);
      if (res.status !== 200) throw new Error('bad request');
      this.setState({ fetchedData: res.data.data });
    })().catch(() => this.setState({ isError: true }));
  }

  render() {
    const { isError, fetchedData } = this.state;
    const { mode } = this.props;
    if (isError) throw new Error('Couldn\'t load main page section');
    if (!fetchedData) return <div className="main-section--loading"><LoadRing /></div>;
    const str = headerDecoder(mode);
    return (
      <div className="main-section">
        <h4>{str}</h4>
        <div className="main-list-container  row  no-gutters  justify-content-start">
          {fetchedData.map(i => (
            <div key={i.id} className="main__item  main__item--small  col">
              <Link to={`/title/${i.id}`}>
                <img
                  src={i.attributes.posterImage.tiny}
                  alt={i.attributes.titles.en || i.attributes.canonicalTitle}
                />
                <div className="main__desc-wrapper  main__desc-wrapper--small">
                  <span className="main__desc">{i.attributes.titles.en || i.attributes.canonicalTitle}</span>
                </div>
              </Link>
            </div>
          ))
        }
        </div>
        <Link to={`/search?displayMode=${mode}&offset=0`}>
          Search more titles
        </Link>
      </div>
    );
  }
}
