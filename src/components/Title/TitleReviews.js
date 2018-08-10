import React, {Component} from 'react';
import TitleReviewItem from './TitleReviewItem.js';
import axios from 'axios';
import LoadRing from '../LoadRing.jsx';

export default class TitleReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null,
      isError: false
    }
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    const request = async () => {
      const res = await axios.get(this.props.url);
      this.setState({reviews: res.data});
    }
    request().catch(() => this.setState({isError: true}));
  }

  render() {
    if (this.state.isError) throw new Error(`Couldn't load reviews for the title`);
    if (!this.state.reviews) return <div className="main-section--loading"><LoadRing/></div>;
    return (
      <ul className="title__review-list">
      {this.state.reviews.data.length > 0 && <h3>Popular reviews</h3>}
      {this.state.reviews.data.slice(0,5).map(i => {
        return(
          <TitleReviewItem key={i.id} author={i.attributes.source} content={i.attributes.contentFormatted} likes={i.attributes.likesCount} date={i.attributes.updatedAt}/>
        )
      })}
      </ul>
    )
  }
}
