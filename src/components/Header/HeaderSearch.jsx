import React, { Component } from 'react';
import HeaderPopup from './HeaderPopup.jsx';
import queryString from 'query-string';
import axios from 'axios';
import { apiLink } from 'constants.js';

export default class HeaderSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      activeItem: null,
      fetchedData: null
    }
    this.setState = this.setState.bind(this);
    this.props.history.listen(() => this.setState({inputValue: ''}));
    this.timer = null;
  }

  request = async () => {
    try {
      const res = await axios.get(`${apiLink}/anime`,{params:{
        'filter[text]': this.state.inputValue,
        'page[limit]': 5,
        'fields[anime]': 'id,titles,canonicalTitle,showType'
      }});
      this.setState({fetchedData : res.data});
    } catch (err) {
      this.setState({isError: err});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {inputValue} = this.state;
    if (inputValue.length<3) return;
    if (inputValue !== prevState.inputValue) {
      this.setState({fetchedData: null});
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(this.request, 350);
    }
  }

  handleKeyPress(event, searchLink) {
    if(this.state.inputValue.length<3) return;
    switch(event.key) {
      case 'Enter':
      if (this.state.activeItem === null || this.state.activeItem === 5) {
        return this.props.history.push(searchLink);
      } else {
        return this.props.history.push(`/title/${this.state.fetchedData.data[this.state.activeItem].id}`);
      }
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
      default: return;
    }
  }

  render() {
    const searchLink = '/search?' + queryString.stringify({displayMode:'filter',filterText:this.state.inputValue,offset:0});
    if (this.state.isError) throw new Error(`Couldn't load from search bar`);
    return (
      <div className='search  col-sm-4'>
      <input
        type="text"
        className="search__input  form-control"
        value={this.state.inputValue}
        onChange={e => this.setState({inputValue: e.target.value})}
        onKeyUp={e => this.handleKeyPress(e,searchLink)}
        placeholder="Search for titles"
      />
      {this.state.inputValue.length > 2 && <HeaderPopup
        fetchedData={this.state.fetchedData}
        activeItem={this.state.activeItem}
        searchLink={searchLink}
        />}
      </div>
  )}
}
