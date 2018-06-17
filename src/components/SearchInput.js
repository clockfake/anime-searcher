import React, { Component } from 'react';
import SearchPopup from './SearchPopup.js';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
  }

  handleInput(event) {
    this.setState({inputValue: event.target.value});
  }

  render() {
    return(
      <div className='search__wrapper'>
        <input className='search__input' onChange={(e) => this.handleInput(e)} type="text"/>
        <SearchPopup input={this.state.inputValue}/>
      </div>
    )
  }
}
