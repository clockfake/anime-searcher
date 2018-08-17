import React, { Component } from 'react';
import 'css/Title.css';
import TitleReviews from './TitleReviews.jsx';
import TitleRender from './TitleRender.jsx';
import VideoModal from './VideoModal';
import axios from 'axios';
import LoadRing from '../LoadRing.jsx';
import { apiLink } from 'constants.js';

export default class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedTitle: null,
      isError: false,
      shouldShowModal: false
    }
    // this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    (async () => {
      const res = await axios.get(`${apiLink}/anime/${this.props.match.params.id}`);
      this.setState({fetchedTitle: res.data});
    })().catch(() => this.setState({isError: true}));
  }

  componentDidUpdate() {
    if (!this.state.fetchedTitle) return;
    if (this.state.fetchedTitle.data.id !== this.props.match.params.id) {
      this.setState({fetchedTitle: null});
      (async () => {
        const res = await axios.get(`${apiLink}/anime/${this.props.match.params.id}`);
        this.setState({fetchedTitle: res.data});
      })().catch(() => this.setState({isError: true}));
    }
  }

  toggleModal() {
    this.setState((prevState) => ({shouldShowModal: !prevState.shouldShowModal}));
  }

  render() {
    if (this.state.isError) throw new Error(`Couldn't load title info`);
    if (!this.state.fetchedTitle) return <div className="main-section--loading"><LoadRing/></div>;
    return (
    <div className="title">
      <TitleRender title={this.state.fetchedTitle.data.attributes} toggleModal={() => this.toggleModal()} id={this.state.fetchedTitle.data.id}/>
      <TitleReviews url={`${apiLink}/anime/${this.props.match.params.id}/reviews?sort=-likesCount&page[limit]=5`}/>
      {this.state.shouldShowModal && <VideoModal toggleModal={() => this.toggleModal()} videoId={this.state.fetchedTitle.data.attributes.youtubeVideoId}/>}
    </div>
  )
  }
}
