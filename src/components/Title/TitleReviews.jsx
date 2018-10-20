import React, { Component, Fragment } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TitleReviewItem from './TitleReviewItem.jsx';
import LoadRing from '../LoadRing.jsx';

export default class TitleReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
      isError: false,
    };
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    const { url } = this.props;
    (async () => {
      const res = await axios.get(url);
      this.setState({ reviews: res.data });
    })().catch(() => this.setState({ isError: true }));
  }

  render() {
    const { note } = this.props;
    const { reviews, isError } = this.state;
    if (isError) throw new Error('Couldn\'t load reviews for the title');
    if (!reviews) return <div className="main-section--loading"><LoadRing /></div>;
    return (
      <ul className="title__review-list">
        {note && (
          <Fragment>
            <h3>Your note</h3>
            <TitleReviewItem
              selfnote
              author={null}
              content={note.text}
              likes={note.rate}
              date={note.date}
            />
          </Fragment>
        )}
        {reviews.data.length > 0 && <h3>Popular reviews</h3>}
        {reviews.data.map(i => (
          <TitleReviewItem
            key={i.id}
            author={i.attributes.source}
            content={i.attributes.contentFormatted}
            likes={i.attributes.likesCount}
            date={i.attributes.updatedAt}
          />
        ))}
      </ul>
    );
  }
}

TitleReviews.propTypes = {
  url: PropTypes.string.isRequired,
};
