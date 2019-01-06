import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) {
      return (
        <div>
          <h3>The following error occured while loading this page:</h3>
          <p>{error.toString()}</p>
          <Link to="/" onClick={() => this.setState({ error: null })}>Return to the main page</Link>
        </div>
      );
    }
    return children;
  }
}

ErrorHandler.propTypes = {
  children: PropTypes.arrayOf(
    PropTypes.element,
  ).isRequired,
};
