import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VideoModal extends Component {
  state = {
    rate: 0,
    text: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    const { rate, text } = this.state;
    e.preventDefault();
    this.props.saveNote(rate, text);
  };

  ratingStars = () => {
    const { rate } = this.state;
    const stars = Array.from({ length: 10 }, (i, idx) => 10 - idx);
    return (
      <div className="rating">
        {stars.map(star => (
          <span
            key={star}
            className={rate >= star ? 'star-selected' : ''}
            onClick={() => this.setState({ rate: star })}
          >
            ☆
          </span>
        ))}
      </div>
    );
  };

  render() {
    const { videoId, toggleModal, type } = this.props;
    const { text } = this.state;
    return (
      <div className="modal-overlay" role="presentation" onClick={toggleModal}>
        {type === 'video' && (
          <iframe
            title="modal-video"
            className="modal-window"
            src={`https://www.youtube.com/embed/${videoId}`}
            allowFullScreen="allowfullscreen"
            mozallowfullscreen="mozallowfullscreen"
            msallowfullscreen="msallowfullscreen"
            oallowfullscreen="oallowfullscreen"
            webkitallowfullscreen="webkitallowfullscreen"
          />
        )}
        {type === 'note' && (
          <div className="modal-dialog" role="document">
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-title">
                <h4>Make a note about this anime!</h4>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleSubmit}>
                  <p className="mb-0">Rate this title:</p>
                  {this.ratingStars()}
                  <p>{`${this.state.rate}/10`}</p>
                  <textarea
                    className="form-control"
                    name="text"
                    value={text}
                    onChange={this.handleChange}
                  />
                  <button type="submit" className="btn btn-primary mt-2">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

VideoModal.propTypes = {
  videoId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default VideoModal;
