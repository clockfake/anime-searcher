import React, {Component} from 'react';

export default class TitleGenreList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedGenres: null
    }
  }

  componentWillMount() {
    const boundSetState = this.setState.bind(this);
    let fetchdata = fetch(this.props.url);
    fetchdata.then(response => response.json()).then(result => boundSetState({fetchedGenres:result}));
  }

  render() {
    if (!this.state.fetchedGenres) return <div>Loading</div>
    return (
      <div className="title__categories">
      Categories:
      {this.state.fetchedGenres.data.map( (i,index) => {
        return <span className="title__category" key={index}>{i.attributes.name}</span>
      })}
      </div>
    )
  }
}
