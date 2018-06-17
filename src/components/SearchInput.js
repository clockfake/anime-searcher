import React, { Component } from 'react';
import {connect} from 'react-redux';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedTitle: undefined
    }
  }

  handleInput(event) {
    this.props.onHandleInput(event.target.value);
  }

  render() {
    return(
      <div className='search__wrapper'>
        <input className='search__input' onChange={(e) => this.handleInput(e)} type="text"/>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    onHandleInput: (inputValue) => {dispatch({type:'SEARCH_INPUT_CHANGE',payload:inputValue})}
  })
)(SearchInput);
