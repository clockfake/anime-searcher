import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { pageLimit } from 'constants.js';

const Pagination = ({offset,count,displayMode,filterText}) => (
   <div className="main__button-section">
      <PageLink linkTo={`/search/?${queryString.stringify({displayMode, offset:offset-1, filterText})}`} condition={offset<=0} text='Prev'/>
    <div>
    <PageLink linkTo={`/search/?${queryString.stringify({displayMode, offset:0, filterText})}`} condition={Number(offset) === 0} text='First'/>
    <PageLink linkTo={`/search/?${queryString.stringify({displayMode, offset:1, filterText})}`} condition={Number(offset) === 1} text='2'/>
    <span className='btn btn-info disabled'>Current page: {offset+1}</span>
    <PageLink linkTo={`/search/?${queryString.stringify({displayMode, offset:Math.floor(count/pageLimit)-1, filterText})}`} condition={offset+1===Math.floor(count/pageLimit)} text={Math.floor(count/pageLimit)}/>
    <PageLink linkTo={`/search/?${queryString.stringify({displayMode, offset:Math.floor(count/pageLimit), filterText})}`} condition={(offset+1)*pageLimit>=+count} text='Last'/>
    </div>
    <PageLink linkTo={`/search/?${queryString.stringify({displayMode, offset:offset+1, filterText})}`} condition={(offset+1)*pageLimit>=+count} text='Next'/>
  </div>
);

const PageLink = ({condition, linkTo, text}) => (
  <Link to={linkTo} onClick={(e) => {if (condition) e.preventDefault()}}>
    <button className={`btn btn-info ${condition ? 'disabled' : ''}`}>{text}</button>
  </Link>
)

Pagination.propTypes = {
  offset: PropTypes.number,
  count: PropTypes.number,
  displayMode: PropTypes.string,
  filterText: PropTypes.string
}

export default Pagination;
