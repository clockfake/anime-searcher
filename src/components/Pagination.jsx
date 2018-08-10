import React from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';

const Pagination = ({offset,lastOffset,displayMode,filterText}) => {
  const prevLink = queryString.stringify({displayMode, offset:Number(offset)-16, filterText});
  const nextLink = queryString.stringify({displayMode, offset:Number(offset)+16, filterText});
  return (
   <div className="main__button-section">
    <Link to={`/search/?${prevLink}`} onClick={(e) => {if (offset<=0) e.preventDefault()}}>
      <button className={`${offset <=0 ? 'btn btn-info disabled' : 'btn btn-info'}`}>Prev</button>
    </Link>
    <Link
      to={`/search/?${queryString.stringify({displayMode, offset:0, filterText})}`}
      onClick={(e) => {if (Number(offset) === 0) e.preventDefault()}}
    >
      <button className={`${Number(offset) === 0 ? 'btn btn-info disabled' : 'btn btn-info'}`}>First</button>
    </Link>
    <Link
      to={`/search/?${queryString.stringify({displayMode, offset:16, filterText})}`}
      onClick={(e) => {if (Number(offset) === 16) e.preventDefault()}}
    >
      <button className={`${Number(offset) === 16 ? 'btn btn-info disabled' : 'btn btn-info'}`}>2</button>
    </Link>
    <p className='btn btn-info disabled'>Current page: {Math.floor(offset/16+1)}</p>
    <Link
      to={`/search/?${queryString.stringify({displayMode, offset:lastOffset-16, filterText})}`}
      onClick={(e) => {if (+offset===lastOffset-16) e.preventDefault()}}
    >
      <button className={`${+offset===lastOffset-16 ? 'btn btn-info disabled' : 'btn btn-info'}`}>{Math.floor(lastOffset/16)}</button>
    </Link>
    <Link
      to={`/search/?${queryString.stringify({displayMode, offset:lastOffset, filterText})}`}
      onClick={(e) => {if (+offset===+lastOffset) e.preventDefault()}}
    >
      <button className={`${+offset===+lastOffset ? 'btn btn-info disabled' : 'btn btn-info'}`}>Last</button>
    </Link>
    <Link
      to={`/search/?${nextLink}`}
      onClick={(e) => {if (offset >= lastOffset) e.preventDefault()}}>
      <button className={`${offset >= lastOffset ? 'btn btn-info disabled' : 'btn btn-info'}`}>Next</button>
    </Link>
  </div>
)
}

export default Pagination;
