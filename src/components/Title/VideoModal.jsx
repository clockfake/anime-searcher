import React from 'react';

const VideoModal = ({shouldShow, videoId, toggleModal}) => {
  if (!shouldShow) return <div></div>;
  return (
    <React.Fragment>
    <div className="modal-overlay" onClick={() => toggleModal()}></div>
    <div className="modal-window-wrapper" onClick={() => toggleModal()}>
    <iframe
      title={videoId}
      className="modal-window"
      src={`https://www.youtube.com/embed/${videoId}`}
      allowFullScreen="allowfullscreen"
      mozallowfullscreen="mozallowfullscreen"
      msallowfullscreen="msallowfullscreen"
      oallowfullscreen="oallowfullscreen"
      webkitallowfullscreen="webkitallowfullscreen">
    </iframe>
    </div>
    </React.Fragment>
  )
}

export default VideoModal;
