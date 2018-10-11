import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { apiLink } from 'constants.js';
import 'css/Title.css';
import TitleReviews from './TitleReviews.jsx';
import TitleRender from './TitleRender.jsx';
import VideoModal from './VideoModal';
import LoadRing from '../LoadRing.jsx';

export default class Title extends Component {
  state = {
    fetchedTitle: null,
    isError: false,
    shouldShowModal: false,
  }

  componentDidMount() {
    this.request();
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

  toggleModal() {
    this.setState(({ shouldShowModal }) => ({ shouldShowModal: !shouldShowModal }));
  }

  closeModalwithKeyboard(e) {
    if (e.key === 'Escape') {
      this.toggleModal();
    }
  }

  render() {
    const { isError, fetchedTitle, shouldShowModal } = this.state;
    const { id } = this.props.match.params; //eslint-disable-line
    if (isError) throw new Error('Couldn\'t load title info');
    if (!fetchedTitle) return <div className="main-section--loading"><LoadRing /></div>;
    return (
      <div className="title">
        <TitleRender
          title={fetchedTitle.data.attributes}
          toggleModal={() => this.toggleModal()}
          id={fetchedTitle.data.id}
        />
        <TitleReviews url={`${apiLink}/anime/${id}/reviews?sort=-likesCount&page[limit]=5`} />
        {shouldShowModal && (
          <VideoModal
            toggleModal={e => this.toggleModal(e)}
            closeModalwithKeyboard={() => this.closeModalwithKeyboard}
            videoId={fetchedTitle.data.attributes.youtubeVideoId}
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
