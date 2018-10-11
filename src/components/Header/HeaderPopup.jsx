import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LoadRing from '../LoadRing.jsx';

const HeaderPopup = ({ fetchedData, activeItem, searchLink }) => {
  if (!fetchedData) return <div className="search__popup-loading"><LoadRing /></div>;
  if (fetchedData && !fetchedData.data.length) {
    return <div className="search__popup-loading">No results</div>;
  }
  return (
    <ul className="search__popup-list">
      {fetchedData.data.map((i, index) => (
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

HeaderPopup.propTypes = {
  fetchedData: PropTypes.object,
  activeItem: PropTypes.number,
  searchLink: PropTypes.string,
};

HeaderPopup.defaultProps = {
  fetchedData: {
    data: [
      {
        id: 10067,
        attributes: {
          titles: {
            en: 'HIMOUTO! UMARU-CHAN',
          },
          showType: 'TV',
        }
      }
    ]
  },
  activeItem: 0,
  searchLink: '',
}

export default HeaderPopup;
