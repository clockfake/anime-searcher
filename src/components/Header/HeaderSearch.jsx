import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { apiLink } from 'constants.js';
import HeaderPopup from './HeaderPopup.jsx';

export default class HeaderSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      activeItem: null,
      fetchedData: null,
    };
    this.setState = this.setState.bind(this);
    this.props.history.listen(() => this.setState({ inputValue: '' }));
    this.timer = null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputValue } = this.state;
    if (inputValue.length < 3) return;
    if (inputValue !== prevState.inputValue) {
      this.setState({ fetchedData: null });
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(this.request, 350);
    }
  }

  request = async () => {
    const { inputValue } = this.state;
    try {
      const res = await axios.get(`${apiLink}/anime`,
        {
          params: {
            'filter[text]': inputValue,
            'page[limit]': 5,
            'fields[anime]': 'id,titles,canonicalTitle,showType',
          },
        });
      this.setState({ fetchedData: res.data });
    } catch (err) {
      this.setState({ isError: err });
    }
  }

  handleKeyPress(event, searchLink) {
    const { history } = this.props;
    const { activeItem, fetchedData, inputValue } = this.state;
    if (inputValue.length < 3) return;
    switch (event.key) {
      case 'Enter':
        if (activeItem === null || activeItem === 5) {
          history.push(searchLink);
        } else {
          history.push(`/title/${fetchedData.data[activeItem].id}`);
        }
        break;
      case 'Escape': this.setState({ inputValue: '' }); break;
      case 'ArrowDown': {
        if (activeItem === null) { this.setState({ activeItem: 0 }); } else
        if (activeItem < 5) this.setState(({ activeItem }) => ({ activeItem: activeItem + 1 }));
        break;
      }
      case 'ArrowUp': {
        if (activeItem === 0) { this.setState({ activeItem: null }); } else
        if (activeItem !== null) {
          this.setState(({ activeItem }) => ({ activeItem: activeItem - 1 }));
        }
        break;
      }
      default:
    }
  }

  render() {
    const {
      isError,
      inputValue,
      fetchedData,
      activeItem,
    } = this.state;
    const searchLink = `/search?${queryString.stringify({ displayMode: 'filter', filterText: inputValue, offset: 0 })}`;
    if (isError) throw new Error('Couldn\'t load from search bar');
    return (
      <div className="search  col-sm-4">
        <input
          type="text"
          className="search__input  form-control"
          value={inputValue}
          onChange={e => this.setState({ inputValue: e.target.value })}
          onKeyUp={e => this.handleKeyPress(e, searchLink)}
          placeholder="Search for titles"
        />
        {inputValue.length > 2 && (
          <HeaderPopup
            fetchedData={fetchedData}
            activeItem={activeItem}
            searchLink={searchLink}
          />
        )}
      </div>
    );
  }
}
