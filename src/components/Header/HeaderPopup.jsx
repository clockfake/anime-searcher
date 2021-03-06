// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import LoadRing from '../LoadRing.jsx';
import type { Title } from '../../constants';

type Props = {
  fetchedData: ?Array<Title>,
  activeItem: number,
  searchLink: string,
}

const HeaderPopup = ({ fetchedData, activeItem, searchLink }: Props) => {
  if (!fetchedData) return <div className="search__popup-loading"><LoadRing /></div>;
  if (fetchedData && fetchedData.length === 0) {
    return <div className="search__popup-loading">No results</div>;
  }
  return (
    <ul className="search__popup-list">
      {fetchedData.map((i, index) => (
        <li key={i.id} className={`search__popup-item  list-group-item ${activeItem === index ? 'active' : ''}`}>
          <Link className="search__item-info-wrapper" to={`/title/${i.id}`}>
            <span>{i.attributes.titles.en || i.attributes.canonicalTitle}</span>
            <span className="badge badge-secondary">{i.attributes.showType}</span>
          </Link>
        </li>
      ))}
      <li className={`search__popup-to-form  list-group-item  ${activeItem === 5 ? 'active' : ''}`}>
        <Link to={searchLink}>More results</Link>
      </li>
    </ul>
  );
};

export default HeaderPopup;
