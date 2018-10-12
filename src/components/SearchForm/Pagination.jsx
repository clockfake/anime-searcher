import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';

const Pagination = ({
  offset,
  limit,
  count,
  displayMode,
  filterText,
}) => {
  const calcPages = (offset, limit, count) => {
    if (count / limit < 5) return Array.from({ length: Math.ceil(count / limit) }, (i,index) => index);
    if (offset < 3) return [0, 1, 2, 3, 4];
    if (offset > count / limit - 5) {
      const last = Math.ceil(count / limit);
      return [last - 4, last - 3, last - 2, last - 1, last];
    }
    return [offset - 2, offset - 1, offset, offset + 1, offset + 2];
  };

  if (+count <= +limit) return <div/>;
  return (
    <ul className="pagination">
      <li className={`page-item ${offset <= 0 && 'disabled'}`}>
        <Link
          className="page-link"
          to={`/search/?${queryString.stringify({ displayMode, offset: offset - 1, filterText })}`}
          onClick={(e) => { if (offset <= 0) e.preventDefault(); }}
        >
          «
        </Link>
      </li>
      {calcPages(offset, limit, count).map(i => (
        <li key={i} className={`page-item ${i === +offset && 'active'}`}>
          <Link className="page-link" to={`/search/?${queryString.stringify({ displayMode, offset: i, filterText })}`}>
            {i + 1}
          </Link>
        </li>
      ))}
      <li className={`page-item ${(+offset + 1) * limit >= count && 'disabled'}`}>
        <Link
          className="page-link"
          to={`/search/?${queryString.stringify({ displayMode, offset: offset + 1, filterText })}`}
          onClick={(e) => { if ((+offset + 1) * limit >= count) e.preventDefault(); }}
        >
          »
        </Link>
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  offset: PropTypes.number,
  count: PropTypes.number,
  limit: PropTypes.number,
  displayMode: PropTypes.string,
  filterText: PropTypes.string,
};

Pagination.defaultProps = {
  offset: 0,
  count: 10000,
  limit: 16,
  displayMode: 'top-rated',
  filterText: '',
};

export default Pagination;
