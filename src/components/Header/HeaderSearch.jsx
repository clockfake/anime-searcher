import React, {Component} from 'react';
import HeaderPopup from './HeaderPopup.jsx';
import {Redirect} from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import { apiLink } from 'constants.js';
import debounce from 'debounce';

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
    this.props.history.listen(() => this.setState({inputValue: ''}));
  }

  request = async () => {
    try {
      this.setState({fetchedData: null});
      const res = await axios.get(`${apiLink}/anime`,{params:{
        'filter[text]': this.state.inputValue,
        'page[limit]': 5,
        'fields[anime]': 'id,titles,canonicalTitle,showType'
      }});
      console.log('made api call');
      this.setState({fetchedData : res.data});
    } catch (err) {
      this.setState({isError: err});
    }
  }

  throttledReq = debounce(this.request, 300);

  componentDidUpdate(prevProps, prevState) {
    const {shouldRedirect, inputValue} = this.state;
    if (shouldRedirect) this.setState({shouldRedirect: false, activeItem: null});
    if (inputValue.length<3) return;
    if (inputValue !== prevState.inputValue) {
      this.throttledReq();
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
    const searchLink = '/search?' + queryString.stringify({displayMode:'filter',filterText:this.state.inputValue,offset:0});
    if (this.state.isError) throw new Error(`Couldn't load from search bar`);
    if (this.state.shouldRedirect) {
      if (this.state.activeItem === null || this.state.activeItem === 5) {
        return <Redirect to={searchLink}/>;
      } else {
        return <Redirect to={`/title/${this.state.fetchedData.data[this.state.activeItem].id}`}/>;
      }
    }

    return (
      <div className='search  col-sm-4'>
      <input
        type="text"
        className="search__input  form-control"
        value={this.state.inputValue}
        onChange={e => this.setState({inputValue: e.target.value})}
        onKeyUp={e => this.handleKeyPress(e)}
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
