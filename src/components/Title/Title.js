import React, { Component } from 'react';
import 'css/Title.css';
import TitleReviews from './TitleReviews.js';
import TitleRender from './TitleRender.jsx';
import VideoModal from './VideoModal';
import LoadRing from '../LoadRing.jsx';

export default class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedTitle: null,
      isError: false,
      shouldShowModal: false
    }
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    fetch('https://kitsu.io/api/edge/anime/' + this.props.match.params.id)
      .then(response => {
        if (response.status!==200) {
          this.setState({isError: true});
        } return response.json();
      })
      .then(result => this.setState({fetchedTitle:result}))
      .catch(() => this.setState({isError:true}));
  }

  componentDidUpdate() {
    if (!this.state.fetchedTitle) return;
    if (this.state.fetchedTitle.data.id !== this.props.match.params.id) {
      this.setState({fetchedTitle: null});
      fetch('https://kitsu.io/api/edge/anime/' + this.props.match.params.id)
        .then(response => {
          if (response.status!==200) {
            this.setState({isError: true});
          }
          return response.json()
        })
        .then(result => this.setState({fetchedTitle:result}))
        .catch(() => this.setState({isError:true}));
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
      <TitleReviews url={`https://kitsu.io/api/edge/anime/${this.props.match.params.id}/reviews?sort=-likesCount`}/>
      <VideoModal shouldShow={this.state.shouldShowModal} toggleModal={() => this.toggleModal()} videoId={this.state.fetchedTitle.data.attributes.youtubeVideoId}/>
    </div>
  )
  }
}
