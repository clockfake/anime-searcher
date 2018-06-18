import React, { Component } from 'react';
import TitleGenreList from './TitleGenreList.js';

export default class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedTitle: null,
    }
  }

  componentWillMount() {
    const boundSetState = this.setState.bind(this);
    let fetchdata = fetch('https://kitsu.io/api/edge/anime/' + this.props.match.params.id);
    fetchdata.then(response => response.json()).then(result => boundSetState({fetchedTitle:result}));
  }

  componentDidUpdate() {
      const boundSetState = this.setState.bind(this);
      let fetchdata = fetch('https://kitsu.io/api/edge/anime/' + this.props.match.params.id);
      fetchdata.then(response => response.json()).then(result => boundSetState({fetchedTitle:result}));
  }

  render() {
    if (!this.state.fetchedTitle) return <p>Loading</p>;
    if (this.state.fetchedTitle.data.id != this.props.match.params.id) {
      this.setState({fetchedTitle: null});
    }
    let info = this.state.fetchedTitle.data.attributes;
    return (
    <div className="title">
      <div className="title__poster"><img src={info.posterImage.medium}/></div>
      <div className="title__info">
        <h2 className="title__header">{info.titles.en || info.canonicalTitle}</h2>
        <div className="title__plot">{info.synopsis}</div>
        <div className="title__section-wrapper">
        <div className="title-section">
          <p className="title-section__heading">Show type:</p>
          <p className="title-section__value">{info.showType === 'TV'? `${info.showType} (${info.episodeCount} episodes)` : info.showType}</p>
        </div>
        <div className="title-section">
          <p className="title-section__heading">Status</p>
          <p className="title-section__value">{info.status === 'finished'? `${info.status} ${info.endDate}` : info.status}</p>
        </div>
        <div className="title-section">
          <p className="title-section__heading">Rating:</p>
          <p className="title-section__value">{info.averageRating}</p>
        </div>
        <div className="title-section">
          <p className="title-section__heading">Popularity rank:</p>
          <p className="title-section__value">{info.popularityRank}</p>
        </div>
        </div>
        <TitleGenreList url={`https://kitsu.io/api/edge/anime/${this.state.fetchedTitle.data.id}/genres`}/>
      </div>
    </div>
  )
  }
}
