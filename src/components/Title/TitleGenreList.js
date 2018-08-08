import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import queryString from 'query-string';
import LoadRing from '../LoadRing.jsx';

export default class TitleGenreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedGenres: null,
      isError: false
    }
    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    fetch(this.props.url).then(response => {
    if (response.status!==200) {
      this.setState({isError: true});
      return null;
  } return response.json()}).then(result => this.setState({fetchedGenres:result}))
    .catch(() => this.setState({isError:true}));
  }

  render() {
    if (this.state.isError) throw new Error(`Couldn't load title's category list`);
    if (!this.state.fetchedGenres) return <LoadRing/>;
    return (
      <div className="title__categories">
      Categories:
      {this.state.fetchedGenres.data.map(i => {
        const linkStr = '/search?' + queryString.stringify({displayMode:'filter-category',filterText:i.attributes.title,offset:0});
        return (
        <Link to={linkStr} key={i.id} className="btn btn-light title__category">{i.attributes.title}</Link>
        )
      })}
      </div>
    )
  }
}