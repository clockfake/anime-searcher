import React, {Component} from 'react';

export default class TitleReviewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  render() {
    let postText;
    if (this.state.show ||this.props.content.length <= 800) {
      postText = this.props.content;
    } else {postText = this.props.content.slice(0,800) + '...'}
    return (
      <li className="title__review-item">
        <p className="title__review-author">Source: {this.props.author}</p>
        <p className="title__review-content" dangerouslySetInnerHTML={{__html: postText}}/>

        {this.props.content.length > 800 && <button onClick={() => this.setState(prevState => ({show: !prevState.show}))}>{this.state.show ? 'Show less' : 'Show more'}</button>}
      </li>
    )
  }
}
