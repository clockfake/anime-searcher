import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
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
    (async () => {
      const res = await axios.get(this.props.url);
      this.setState({fetchedGenres: res.data});
    })().catch(() => this.setState({isError: true}));
  }

  render() {
    if (this.state.isError) throw new Error(`Couldn't load title's category list`);
    if (!this.state.fetchedGenres) return <LoadRing/>;
    return (
      <div className="title__categories">
      Categories:
      {this.state.fetchedGenres.data.map(i => (
        <Link
          to={`/search?${queryString.stringify({displayMode:'filter-category',filterText:i.attributes.title,offset:0})}`}
          key={i.id}
          className="btn btn-light title__category"
        >{i.attributes.title}</Link>
        )
      )}
      </div>
    )
  }
}
