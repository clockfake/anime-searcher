import React from 'react';
import { Link } from 'react-router-dom';
import HeaderSearch from './HeaderSearch.jsx';
import 'css/Header.css';

const Header = props => (
  <div className="header  row  justify-content-between  no-gutters">
    <div className="logo  col-sm-4"><Link to="/"><span>Weaboo</span></Link></div>
    <HeaderSearch {...props} />
  </div>
);

export default Header;
