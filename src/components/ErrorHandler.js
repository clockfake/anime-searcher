import React, {Component} from 'react';

export default class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }

  componentDidCatch(error) {
    this.setState({error: error});
  }

  render() {
    if (this.state.error) return (
      <div>
        <h3>The following error occured while loading this page:</h3>
        <p>{this.state.error && this.state.error.toString()}</p>
        <p>Please, return to the main page</p>
      </div>
    );
    return this.props.children;
  }
}
