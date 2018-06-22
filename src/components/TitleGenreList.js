import React, {Component} from 'react';

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
    if (this.state.isError) return <div>Error</div>;
    if (!this.state.fetchedGenres) return <div>Loading</div>;
    return (
      <div className="title__categories">
      Categories:
      {this.state.fetchedGenres.data.map(i => {
        return <span className="title__category" key={i.id}>{i.attributes.title}</span>
      })}
      </div>
    )
  }
}
