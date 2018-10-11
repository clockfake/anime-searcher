import React from 'react';
import PropTypes from 'prop-types';

const VideoModal = ({ videoId, toggleModal, closeModalwithKeyboard }) => (
  <div
    className="modal-overlay"
    role="presentation"
    onClick={e => toggleModal(e)}
    onKeyUp={closeModalwithKeyboard}
  >
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
  </div>
);

VideoModal.propTypes = {
  videoId: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  closeModalwithKeyboard: PropTypes.func.isRequired,
};

export default VideoModal;
