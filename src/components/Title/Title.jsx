import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { apiLink, getNote, setNote } from 'constants.js';
import 'css/Title.css';
import TitleReviews from './TitleReviews.jsx';
import TitleRender from './TitleRender.jsx';
import Modal from './Modal.jsx';
import LoadRing from '../LoadRing.jsx';

export default class Title extends Component {
  state = {
    fetchedTitle: null,
    isError: false,
    shouldShowModal: false,
    modalType: 'video',
    note: null,
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.request();
    const note = getNote(id);
    if (note) {
      this.setState({ note });
    }
  }

  componentDidUpdate() {
    const { fetchedTitle } = this.state;
    const { id } = this.props.match.params; //eslint-disable-line
    if (!fetchedTitle) return;
    if (fetchedTitle.data.id !== id) {
      this.request();
    }
  }

  request = async () => {
    const { id } = this.props.match.params; //eslint-disable-line
    try {
      this.setState({ fetchedTitle: null });
      const res = await axios.get(`${apiLink}/anime/${id}`);
      this.setState({ fetchedTitle: res.data });
    } catch (err) {
      this.setState({ isError: true });
    }
  }

  toggleModal = (type = 'video') => {
    this.setState(({ shouldShowModal }) => ({ shouldShowModal: !shouldShowModal, modalType: type }));
  }

  saveNote = (rate, text) => {
    const { id } = this.props.match.params; //eslint-disable-line
    const { fetchedTitle } = this.state;
    const note = {
      id,
      image: fetchedTitle.data.attributes.posterImage.tiny,
      title: fetchedTitle.data.attributes.titles.en || fetchedTitle.attributes.canonicalTitle,
      rate,
      text,
      date: new Date().toISOString(),
    }
    setNote(note);
    this.setState({ note, shouldShowModal: false });
  }

  render() {
    const { isError, fetchedTitle, shouldShowModal, modalType, note } = this.state;
    const { id } = this.props.match.params; //eslint-disable-line
    if (isError) throw new Error('Couldn\'t load title info');
    if (!fetchedTitle) return <div className="main-section--loading"><LoadRing /></div>;
    return (
      <div className="title">
        <TitleRender
          title={fetchedTitle.data.attributes}
          toggleModal={(type) => this.toggleModal(type)}
          id={fetchedTitle.data.id}
          noNote={note === null}
        />
        <TitleReviews url={`${apiLink}/anime/${id}/reviews?sort=-likesCount&page[limit]=5`} note={note} />
        {shouldShowModal && (
          <Modal
            toggleModal={() => this.toggleModal()}
            type={modalType}
            videoId={fetchedTitle.data.attributes.youtubeVideoId}
            saveNote={this.saveNote}
          />
        )}
      </div>
    );
  }
}

Title.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
