import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TitleReviewItem extends Component {
  state = {
    show: false,
  }

  render() {
    const {
      author,
      content,
      likes,
      date,
      selfnote
    } = this.props;
    const { show } = this.state;
    return (
      <li className="title__review-item">
        {author && <p className="title__review-author">{`Source: ${author}, likes: ${likes}`}</p>}
        {selfnote && <p>{`You rated this title as ${likes}/10`}</p>}
        {date && <p className="title__review-date">{new Date(date).toLocaleString('ru', { year: 'numeric', day: 'numeric', month: 'numeric' })}</p>}
        <p
          className={show ? 'title__review-content title__review-content--full' : 'title__review-content'}
          dangerouslySetInnerHTML={{ __html: content }} /* eslint-disable-line */
        />
        {content.length > 800 && (
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => this.setState(({ show }) => ({ show: !show }))}  /* eslint-disable-line */
          >
            {show ? 'Show less' : 'Show more'}
          </button>
        )}
      </li>
    );
  }
}

TitleReviewItem.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string.isRequired,
  likes: PropTypes.number,
  date: PropTypes.string,
};

TitleReviewItem.defaultProps = {
  author: '',
  likes: 0,
  date: '2018-10-11T15:06:24.612Z',
};
