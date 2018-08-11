import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import LoadRing from '../LoadRing.jsx';

const HeaderPopup = ({fetchedData, activeItem, input}) => {
  if (input.length<3) return <ul className="search__popup-list--empty"></ul>;
  if (!fetchedData) return <div className="search__popup-loading"><LoadRing/></div>;
  if (fetchedData && !fetchedData.data.length) {
    return <div className="search__popup-loading">No results</div>;
  };
  const searchLink = '/search?' + queryString.stringify({displayMode:'filter',filterText:input,offset:0});
  return (
    <ul className="search__popup-list">
    {fetchedData.data.map((i,index) => (
        <li key={i.id} className={`search__popup-item  list-group-item ${activeItem === index ? 'active' : ''}`}>
          <Link className="search__item-info-wrapper" to={`/title/${i.id}`}>
          <span>{i.attributes.titles.en || i.attributes.canonicalTitle}</span>
          <span className="badge badge-secondary">{i.attributes.showType}</span></Link>
        </li>
      )
    )}
    <li className={`search__popup-to-form  list-group-item  ${activeItem === 5 ? 'active' : ''}`}>
      <Link to={searchLink}>More results</Link>
    </li>
    </ul>)
}

HeaderPopup.propTypes = {
  fetchedData: PropTypes.object,
  activeItem: PropTypes.number,
  input: PropTypes.string
}

export default HeaderPopup;
