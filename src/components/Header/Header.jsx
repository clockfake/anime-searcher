import React from 'react';
import { Link } from 'react-router-dom';
import HeaderSearch from './HeaderSearch.jsx';
import 'css/Header.css';

const Header = props => (
  <nav className="navbar  navbar-expand-sm">
    <Link to="/" className="navbar-brand">Weaboo</Link>
    <div className="collapse  navbar-collapse">
      <Link className="p-2" to="/categories">Categories</Link>
      <Link className="p-2" to="/notes">Noted titles</Link>
    </div>
    <HeaderSearch {...props} />
  </nav>
);

export default Header;
