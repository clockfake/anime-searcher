import React, {Component} from 'react';
import TitleReviewItem from './TitleReviewItem.js';

export default class TitleReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null
    }
  }

  componentWillMount() {
    const boundSetState = this.setState.bind(this);
    fetch(this.props.url).then(response => response.json()).then(result => boundSetState({reviews:result}));
  }

  render() {
    if (!this.state.reviews) return <div>Loading</div>;
    return (
      <ul className="title__review-list">
      {this.state.reviews.data.length > 0 && <h3>Popular reviews</h3>}
      {this.state.reviews.data.slice(0,3).map((i,index) => {
        return(
          <TitleReviewItem key={index} author={i.attributes.source} content={i.attributes.contentFormatted} />
        )
      })}
      </ul>
    )
  }
}
