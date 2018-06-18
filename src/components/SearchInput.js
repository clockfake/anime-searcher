import React, { Component } from 'react';
import SearchPopup from './SearchPopup.js';
import {Link} from 'react-router-dom';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
    this.searchInput = React.createRef();
  }

  onLinkClick() {
    this.searchInput.current.value = '';
    this.setState({inputValue: ''});
  }

  handleInput(event) {
    this.setState({inputValue: event.target.value});
  }

  render() {
    return(
      <div className='search__wrapper'>
        <Link to='/'><div className='logo'>Weaboo</div></Link>
        <input className='search__input' onChange={(e) => this.handleInput(e)} type="text" ref={() => this.searchInput} placeholder="Search for titles"/>
        <SearchPopup input={this.state.inputValue} onLinkClick={this.onLinkClick}/>
      </div>
    )
  }
}
