import React, { Component } from 'react';
import HeaderPopup from './HeaderPopup.js';
import {Link} from 'react-router-dom';
import '../../css/Header.css';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      shouldRedirect: false,
      activeItem: null
    }
    this.props.history.listen((location,action) => {
      this.setState({inputValue: ''});
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.shouldRedirect === true) this.setState({shouldRedirect: false, activeItem: null});
  }

  handleInput(event) {
    this.setState({inputValue: event.target.value});
  }

  handleKeyPress(event) {
    if(this.state.inputValue.length<3) return;
    switch(event.key) {
      case 'Enter': this.setState({shouldRedirect:true}); break;
      case 'Escape': this.setState({inputValue:''}); break;
      case 'ArrowDown': {
        if (this.state.activeItem === null) {this.setState({activeItem:0})} else {
          if (this.state.activeItem < 5) this.setState(prevState => ({activeItem:++prevState.activeItem}));
        }
      break;
      }
      case 'ArrowUp': {
        if (this.state.activeItem === 0) {this.setState({activeItem:null})} else {
          if (this.state.activeItem !== null) this.setState(prevState => ({activeItem:--prevState.activeItem}))
        }
      break;
      }
      default: break;
    }
  }

  render() {
    return(
      <div className='header  row  justify-content-between  no-gutters'>
        <div className="logo  col-sm-4"><Link to='/'><span>Weaboo</span></Link></div>
        <div className='search  col-sm-4'>
        <input
          type="text"
          className="search__input  form-control"
          value={this.state.inputValue}
          onChange={e => this.handleInput(e)}
          onKeyDown={e => this.handleKeyPress(e)}
          placeholder="Search for titles"/>
        <HeaderPopup input={this.state.inputValue} activeItem={this.state.activeItem} shouldRedirect={this.state.shouldRedirect}/>
        </div>
      </div>
    )
  }
}
