import React, {Component} from 'react';
import HeaderPopup from './HeaderPopup.jsx';
import {Redirect} from 'react-router-dom';
import queryString from 'query-string';
import { apiLink } from 'constants.js';

export default class HeaderSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      shouldRedirect: false,
      activeItem: null,
      fetchedData: null
    }
    this.setState = this.setState.bind(this);
    this.props.history.listen((location,action) => {
      this.setState({inputValue: ''});
    });
}

  componentDidUpdate(prevProps, prevState) {
    if (this.state.shouldRedirect) this.setState({shouldRedirect: false, activeItem: null});
    if (this.state.inputValue.length<3) return;
    if (this.state.inputValue !== prevState.inputValue) {
        this.setState({fetchedData: null});
    }
    if (!this.state.fetchedData) {
      fetch(`${apiLink}/anime?filter[text]=${this.state.inputValue}&page[limit]=5&fields[anime]=id,titles,canonicalTitle,showType`)
        .then(response => {
        if (response.status!==200) {
          this.setState({isError: true});
          return null;
      } return response.json()}).then(result => this.setState({fetchedData:result}))
        .catch(() => this.setState({isError:true}));
    }
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
    if (this.state.isError) throw new Error(`Couldn't load from search bar`);
    if (this.state.shouldRedirect) {
      let searchLink;
      if (this.state.activeItem === null || this.state.activeItem === 5) {
        searchLink = '/search?' + queryString.stringify({displayMode:'filter',filterText:this.state.inputValue,offset:0})
      } else {
        searchLink = `/title/${this.state.fetchedData.data[this.state.activeItem].id}`;
      }
      return (<Redirect to={searchLink}/>);
    }

    return (
    <div className='search  col-sm-4'>
    <input
          type="text"
          className="search__input  form-control"
          value={this.state.inputValue}
          onChange={e => this.setState({inputValue: e.target.value})}
          onKeyUp={e => this.handleKeyPress(e)}
          placeholder="Search for titles"/>
      <HeaderPopup fetchedData={this.state.fetchedData} activeItem={this.state.activeItem} input={this.state.inputValue}/>
    </div>
  )}
}
