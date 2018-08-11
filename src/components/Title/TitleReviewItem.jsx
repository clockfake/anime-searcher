import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TitleReviewItem extends Component {
  state = {
      show: false
  }

  render() {
    let postText;
    if (this.state.show ||this.props.content.length <= 800) {
      postText = this.props.content;
    } else {postText = this.props.content.slice(0,800) + '...'};
    let revDate = new Date(this.props.date);
    return (
      <li className="title__review-item">
        <p className="title__review-author">Source: {this.props.author}, likes: {this.props.likes}</p>
        <p className="title__review-date">{revDate.toLocaleString('ru',{year: 'numeric',day: 'numeric',month:'numeric'})}</p>
        <p className="title__review-content" dangerouslySetInnerHTML={{__html: postText}}/>
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
