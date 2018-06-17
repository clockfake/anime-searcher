import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Main extends Component {

  handleSelect(mode) {
    this.props.onHandleSelect(mode);
  }

  render() {
    if (!this.props.animeList) {
      let fetchdata = new XMLHttpRequest();
      fetchdata.open('get','https://kitsu.io/api/edge/anime' + this.props.displayMode + '&page[limit]=12&fields[anime]=id,posterImage,canonicalTitle');
      const boundConnectFunc = this.props.onGetData.bind(this);
      fetchdata.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let result  = JSON.parse(fetchdata.responseText);
        boundConnectFunc(result);
        }
      };
      fetchdata.send();
      return (<div>App loading</div>)};
    return (
    <div className="main__list">
      <div className="main__button-section">
        <button className="main__button" onClick={() => this.handleSelect('top-airing')}>Top airing</button>
        <button className="main__button" onClick={() => this.handleSelect('top-rated')}>Top rated</button>
        <button className="main__button" onClick={() => this.handleSelect('top-popular')}>Top popular</button>
      </div>
      {this.props.animeList.data.map( (i,index) => {
        return (
        <div key={index} className="main__item">
          <Link to={`/title/${i.id}`}>
            <img src={i.attributes.posterImage.small} alt={i.attributes.canonicalTitle}/>
            <div className="main__desc-wrapper">
              <span className="main__desc">{i.attributes.canonicalTitle}</span>
            </div>
          </Link>
      </div>)})
    }
    </div>
  )
  }
}

export default connect(
  state => ({
    animeList: state.animeList,
    displayMode: state.mainDisplayMode
  }),
  dispatch => ({
    onGetData : (result) => {
      dispatch({type: 'FETCH_API_SUCCESS', payload:result})
    },
    onHandleSelect: (mode) => {
      dispatch({type: 'SELECT_DISPLAY_MODE', payload:mode})
    }
  })
)(Main);
