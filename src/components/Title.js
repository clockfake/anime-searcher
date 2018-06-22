import React, { Component } from 'react';
import TitleGenreList from './TitleGenreList.js';
import '../css/Title.css';
import TitleReviews from './TitleReviews.js';

export default class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedTitle: null,
    }
  }
  componentWillMount() {
    const boundSetState = this.setState.bind(this);
    fetch('https://kitsu.io/api/edge/anime/' + this.props.match.params.id)
      .then(response => response.json())
      .then(result => boundSetState({fetchedTitle:result}));
  }

  componentDidUpdate() {
    if (!this.state.fetchedTitle) return;
    if (this.state.fetchedTitle.data.id !== this.props.match.params.id) {
      this.setState({fetchedTitle: null});
      const boundSetState = this.setState.bind(this);
      fetch('https://kitsu.io/api/edge/anime/' + this.props.match.params.id)
        .then(response => response.json())
        .then(result => boundSetState({fetchedTitle:result}));
    }
  }

  render() {
    if (!this.state.fetchedTitle) return <p>Loading</p>;
    let info = this.state.fetchedTitle.data.attributes;
    return (
    <div className="title">
      <div className="title__main  row">
        <div className="title__poster  col"><img src={info.posterImage.medium} alt={info.titles.en || info.canonicalTitle}/></div>
        <div className="title__info  col">
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
        <TitleGenreList url={`https://kitsu.io/api/edge/anime/${this.state.fetchedTitle.data.id}/genres`}/>
        </div>
      </div>
      <TitleReviews url={`https://kitsu.io/api/edge/anime/${this.props.match.params.id}/reviews?sort=-likesCount`}/>
    </div>
  )
  }
}
