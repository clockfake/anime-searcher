import React, { Component } from 'react';
import TitleGenreList from './TitleGenreList.js';
import '../css/Title.css';
import TitleReviews from './TitleReviews.js';

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
        return null;
    } return response.json()})
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
          return null;
      } return response.json()})
        .then(result => this.setState({fetchedTitle:result}))
        .catch(() => this.setState({isError:true}));
    }
  }

  toggleModal() {
    this.setState((prevState) => {return {shouldShowModal: !prevState.shouldShowModal}});
  }

  render() {
    if (this.state.isError) return <p>Error</p>;
    if (!this.state.fetchedTitle) return <div className="main-section--loading"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>;
    let info = this.state.fetchedTitle.data.attributes;
    return (
    <div className="title">
      <div className="title__main  row  no-gutters">
        <div className="title__poster  col-md"><img src={info.posterImage ? info.posterImage.medium : ''} alt={info.titles.en || info.canonicalTitle}/></div>
        <div className="title__info  col-md">
        <h2 className="title__header">{info.titles.en || info.canonicalTitle}</h2>
        <div className="title__plot">{info.synopsis}</div>
        <div className="title__section-wrapper">
        <div className="title-section">
          <p className="title-section__heading">Show type:</p>
          <p className="title-section__value">{info.showType === 'TV' && info.episodeCount ? `${info.showType} (${info.episodeCount} episodes)` : info.showType}</p>
        </div>
        <div className="title-section">
          <p className="title-section__heading">Status</p>
          <p className="title-section__value">{info.status === 'finished'? `${info.status} ${info.endDate}` : info.status}</p>
        </div>
        <div className="title-section">
          <p className="title-section__heading">Rating:</p>
          <p className="title-section__value">{info.averageRating}, Rank {info.ratingRank}</p>
        </div>
        <div className="title-section">
          <p className="title-section__heading">Popularity rank:</p>
          <p className="title-section__value">{info.popularityRank}</p>
        </div>
        </div>
        {info.youtubeVideoId && <button className="title-section__youtube btn btn-primary" onClick={() => this.toggleModal()}>Watch trailer on Youtube</button>}
        <TitleGenreList url={`https://kitsu.io/api/edge/anime/${this.state.fetchedTitle.data.id}/categories`}/>
        </div>
      </div>
      <TitleReviews url={`https://kitsu.io/api/edge/anime/${this.props.match.params.id}/reviews?sort=-likesCount`}/>

      {this.state.shouldShowModal && <div className="modal-overlay" onClick={() => this.toggleModal()}></div>}
      {this.state.shouldShowModal && <div className="modal-window-wrapper">
      <iframe className="modal-window" src={`https://www.youtube.com/embed/${info.youtubeVideoId}`}>
      </iframe>
      </div>}
    </div>
  )
  }
}
