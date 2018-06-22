import React, {Component} from 'react';
import TitleReviewItem from './TitleReviewItem.js';

export default class TitleReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: null
    }
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    fetch(this.props.url).then(response => {
    if (response.status!==200) {
      this.setState({isError: true});
      return null;
  } return response.json()}).then(result => this.setState({reviews:result}))
      .catch(() => this.setState({isError:true}));
  }

  render() {
    if (!this.state.reviews) return <div>Loading</div>;
    return (
      <ul className="title__review-list">
      {this.state.reviews.data.length > 0 && <h3>Popular reviews</h3>}
      {this.state.reviews.data.slice(0,3).map(i => {
        return(
          <TitleReviewItem key={i.id} author={i.attributes.source} content={i.attributes.contentFormatted} />
        )
      })}
      </ul>
    )
  }
}
