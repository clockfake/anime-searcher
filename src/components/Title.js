import React, { Component } from 'react';
import {connect} from 'react-redux';

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedTitle: undefined
    }
  }

  componentDidMount() {
    let fetchTitle = new XMLHttpRequest();
    fetchTitle.open('get','https://kitsu.io/api/edge/anime/' + this.props.match.params.id);
    const boundSetState = this.setState.bind(this);
    fetchTitle.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      boundSetState({fetchedTitle: JSON.parse(fetchTitle.responseText)});
      }
    };
    fetchTitle.send();
  }

  render() {
    if (!this.state.fetchedTitle) {return <p>Loading</p>}
    let info = this.state.fetchedTitle.data.attributes;
    return (
    <div className="title">
      <div className="title__poster"><img src={info.posterImage.large}/></div>
      <div className="title__info">
        <h2 className="title__header">{info.canonicalTitle}</h2>
        <div className="title__plot">{info.synopsis}</div>
        <div className="title__section-wrapper">
        <div className="title-section">
          <p className="title-section__heading">Show type:</p>
          <p className="title-section__value">{info.showType}</p>
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
      </div>
    </div>
  )
  }
}

export default connect()(Title);
