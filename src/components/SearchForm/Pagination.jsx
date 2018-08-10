import React from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

const Pagination = ({offset,lastOffset,displayMode,filterText}) => (
   <div className="main__button-section">
      <PageLink linkTo={`/search/?${queryString.stringify({displayMode, offset:Number(offset)-16, filterText})}`} condition={offset<=0} text='Prev'/>
    <div>
    <PageLink linkTo={`/search/?${queryString.stringify({displayMode, offset:0, filterText})}`} condition={Number(offset) === 0} text='First'/>
    <PageLink linkTo={`/search/?${queryString.stringify({displayMode, offset:16, filterText})}`} condition={Number(offset) === 16} text='2'/>
    <span className='btn btn-info disabled'>Current page: {Math.floor(offset/16+1)}</span>
    <PageLink linkTo={`/search/?${queryString.stringify({displayMode, offset:lastOffset-16, filterText})}`} condition={+offset===lastOffset-16} text={Math.floor(lastOffset/16)}/>
    <PageLink linkTo={`/search/?${queryString.stringify({displayMode, offset:lastOffset, filterText})}`} condition={+offset===+lastOffset} text='Last'/>
    </div>
    <PageLink linkTo={`/search/?${queryString.stringify({displayMode, offset:Number(offset)+16, filterText})}`} condition={offset >= lastOffset} text='{Next}'/>
  </div>
);

const PageLink = ({condition, linkTo, text}) => (
  <Link to={linkTo} onClick={(e) => {if (condition) e.preventDefault()}}>
    <button className={`${condition ? 'btn btn-info disabled' : 'btn btn-info'}`}>{text}</button>
  </Link>
)

export default Pagination;
