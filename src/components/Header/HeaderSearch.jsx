// @flow
import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import { apiLink } from '../../constants';
import HeaderPopup from './HeaderPopup.jsx';
import type { Title } from '../../constants';

type Props = {
  history: {
    push: (path: string) => void,
    listen: (callback: () => void) => void,
  }
}

type State = {
  inputValue: string,
  activeItem: number,
  fetchedData: ?Array<Title>,
  isError: ?boolean,
}

export default class HeaderSearch extends Component<Props, State> {
  timer: ?TimeoutID; // eslint-disable-line

  constructor(props: Props) {
    super(props);
    this.state = {
      inputValue: '',
      activeItem: -1,
      fetchedData: null,
      isError: null,
    };
    const { history: { listen } } = this.props;
    listen(() => this.setState({ inputValue: '' }));
    this.timer = null;
  }

  componentDidUpdate(_: any, prevState: State) {
    const { inputValue } = this.state;
    if (inputValue.length < 3) return;
    if (inputValue !== prevState.inputValue) {
      this.setState({ fetchedData: null }); // eslint-disable-line
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
      this.setState({ fetchedData: res.data.data });
    } catch (err) {
      this.setState({ isError: err });
    }
  }

  handleKeyPress(event: SyntheticKeyboardEvent<HTMLInputElement>, searchLink: string) { // eslint-disable-line
    const { history } = this.props;
    const { activeItem, fetchedData, inputValue } = this.state;
    if (inputValue.length < 3) return;
    switch (event.key) {
      case 'Enter':
        if (activeItem === -1 || activeItem === 5) {
          history.push(searchLink);
        } else if (fetchedData && fetchedData[activeItem]) {
          history.push(`/title/${fetchedData[activeItem].id}`);
        }
        break;
      case 'Escape': this.setState({ inputValue: '' }); break;
      case 'ArrowDown': {
        if (activeItem < 5) this.setState({ activeItem: activeItem + 1 });
        break;
      }
      case 'ArrowUp': {
        if (activeItem > -1) {
          this.setState({ activeItem: activeItem - 1 });
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
