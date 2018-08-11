import React from 'react';
import PropTypes from 'prop-types';

const VideoModal = ({videoId, toggleModal}) => (
    <div className="modal-overlay" onClick={() => toggleModal()}>
    <iframe
      title="modal-video"
      className="modal-window"
      src={`https://www.youtube.com/embed/${videoId}`}
      allowFullScreen="allowfullscreen"
      mozallowfullscreen="mozallowfullscreen"
      msallowfullscreen="msallowfullscreen"
      oallowfullscreen="oallowfullscreen"
      webkitallowfullscreen="webkitallowfullscreen">
    </iframe>
    </div>
)

VideoModal.propTypes = {
  videoId: PropTypes.string.isRequired,
  toggleModal: PropTypes.func
}

export default VideoModal;
