import React, { Component } from 'react';
import SearchPopup from './SearchPopup.js';
import {Link, Redirect} from 'react-router-dom';
import queryString from 'query-string';
import '../css/Header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      shouldRedirect: false
    }
    this.props.history.listen((location,action) => {
      this.setState({inputValue: ''});
    });
  }

  handleInput(event) {
    this.setState({inputValue: event.target.value});
  }

  handleKeyPress(event) {
    if(this.state.inputValue.length<3) return;
    if (event.key === 'Enter') this.setState({shouldRedirect:true});
    if (event.key === 'Escape') this.setState({inputValue:''});
  }

  render() {
    if (this.state.shouldRedirect && this.state.inputValue.length) {
      const searchLink = '/search?' + queryString.stringify({displayMode:'filter',filterText:this.state.inputValue,offset:0});
      return (<Redirect to={searchLink}/>);
    }

    return(
      <div className='header  row  justify-content-between  no-gutters'>
        <div className="logo  col-sm-4"><Link to='/'><span>Weaboo</span></Link></div>
        <div className='search  col-sm-4'>
        <input
          type="text"
          className="search__input"
          value={this.state.inputValue}
          onChange={e => this.handleInput(e)}
          onKeyDown={e => this.handleKeyPress(e)}
          placeholder="Search for titles"/>
        <SearchPopup input={this.state.inputValue}/>
        </div>
      </div>
    )
  }
}
