import React from 'react';

const VideoModal = ({videoId, toggleModal}) => (
    <div className="modal-overlay" onClick={() => toggleModal()}>
    <iframe
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

export default VideoModal;
