import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TitleReviewItem extends Component {
  state = {
      show: false
  }

  render() {
    let revDate = new Date(this.props.date);
    return (
      <li className="title__review-item">
        <p className="title__review-author">Source: {this.props.author}, likes: {this.props.likes}</p>
        <p className="title__review-date">{revDate.toLocaleString('ru',{year: 'numeric',day: 'numeric',month:'numeric'})}</p>
        <p className={this.state.show? 'title__review-content title__review-content--full' : 'title__review-content'}
        dangerouslySetInnerHTML={{__html: this.props.content}}/>
        {this.props.content.length > 800 && <button
          className="btn btn-secondary"
          onClick={() => this.setState(prevState => ({show: !prevState.show}))}
        >{this.state.show ? 'Show less' : 'Show more'}</button>}
      </li>
    )
  }
}

TitleReviewItem.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number,
  date: PropTypes.string
}
