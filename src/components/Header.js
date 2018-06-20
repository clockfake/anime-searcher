import React, { Component } from 'react';
import SearchPopup from './SearchPopup.js';
import {Link} from 'react-router-dom';
import './Header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
    this.searchInput = React.createRef();
    this.props.history.listen((location,action) => {
      this.setState({inputValue: ''});
    });
  }

  handleInput(event) {
    this.setState({inputValue: event.target.value});
  }

  render() {
    return(
      <div className='header'>
        <Link to='/'><div className='logo'>Weaboo</div></Link>
        <input className='search__input' value={this.state.inputValue} onChange={(e) => this.handleInput(e)} type="text" ref={() => this.searchInput} placeholder="Search for titles"/>
        <SearchPopup input={this.state.inputValue}/>
      </div>
    )
  }
}
