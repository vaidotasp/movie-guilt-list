import React, { Component } from 'react';

class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggled: false
    };
  }

  componentWillMount() {
    let list = this.props.favList;
    if (list) {
      list = [];
    }
    // const { id } = this.props.movie;
    // console.log(list);
    // if (list.includes(id)) {
    //   this.setState({ isToggled: true });
    // } else {
    //   this.setState({ isToggled: false });
    // }
  }

  componentDidMount() {
    let list = this.props.favList;

    const { id } = this.props.movie;
    console.log(list);
    if (list.includes(id)) {
      this.setState({ isToggled: true });
    } else {
      this.setState({ isToggled: false });
    }
  }

  toggler = id => {
    if (this.state.isToggled) {
      this.setState({ isToggled: false });
    } else {
      this.setState({ isToggled: true });
    }
  };

  handleFavToggle = id => {
    this.props.updateFavList(id);
  };
  render() {
    const { overview, poster_small, title, id } = this.props.movie;

    return (
      <div className="movie-card">
        <p id="title">{title}</p>
        <div
          className={this.state.isToggled ? 'fav' : 'fav-off'}
          onClick={() => {
            this.handleFavToggle(id);
            this.toggler();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
            <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 464c-119.1 0-216-96.9-216-216S128.9 40 248 40s216 96.9 216 216-96.9 216-216 216zm116-318.4c-41.9-36.3-89.5-8.4-104.9 7.7L248 172.9l-11.1-11.6c-26.6-27.9-72.5-35.9-104.9-7.7-35.3 30.6-37.2 85.6-5.6 118.7l108.9 114.1c7 7.4 18.4 7.4 25.5 0l108.9-114.1c31.5-33.2 29.7-88.1-5.7-118.7zm-17 96.5l-99 103.8-99-103.8c-16.7-17.5-20.4-51.6 3.4-72.1 22.2-19.3 50-6.8 61.9 5.7L248 219l33.7-35.3c8.7-9.2 37.5-26.8 61.9-5.7 23.8 20.5 20.1 54.5 3.4 72.1z" />
          </svg>
        </div>
        <img src={poster_small} alt="img" />
        <p id="overview">{overview}</p>
      </div>
    );
  }
}

export default MovieCard;
