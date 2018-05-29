import React, { Component } from 'react';
import '../css/style.css';
import NavBar from './NavBar';
import SearchField from './SearchField';
import SearchResults from './SearchResults';
import FavItem from './FavItem';
import base from '../base';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentSearch: '',
      results: '',
      favList: [],
      detailed_list: []
    };
  }

  componentDidMount() {
    // console.log(this.props.match.params.userId);
    this.ref = base.syncState(`detailed_list`, {
      context: this,
      state: 'detailed_list'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  fetchResults = currentSearch => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=18e7f830daa0fee62baf2bf7fa436d48&include_adult=false&page=1&query=${currentSearch}`
    )
      .then(response => response.json())
      .then(data => {
        //data normalization should either be happening here or on the display results component
        let filteredList = data.results
          .map(e => {
            //trimming movie overview descriptions to max of 300 chars
            let trimmedOverview;
            if (e.overview.length > 150) {
              trimmedOverview = e.overview.slice(0, 300) + '...';
            } else {
              trimmedOverview = e.overview;
            }
            let movie = {
              id: e.id,
              title:
                e.title +
                ' (' +
                e.release_date.slice(0, e.release_date.indexOf('-')) +
                ')',
              //overview should be cut to the first few sentences at most
              overview: trimmedOverview,
              //slicing release date to indicate only release year
              backdrop: e.backdrop_path,
              poster_small: 'https://image.tmdb.org/t/p/w154' + e.poster_path
            };
            return movie;
          })
          //limit the search results to 10 as any more would be redundant at this time
          .slice(0, 10);
        this.setState({ results: filteredList });
      });
    this.setState({ currentSearch: currentSearch });
  };

  //Add or remove movie to the fav list
  updateFavList = id => {
    let oldList = [...this.state.favList];
    if (!oldList.includes(id)) {
      console.log('it doeesss not!11');
      this.setState({ favList: [...this.state.favList, id] });
    } else {
      console.log('it exiiiiisstttt');
      let newList = oldList.filter(e => e !== id);
      this.setState({ favList: newList });
    }
  };

  updateDetailedList = (id, title, poster_small) => {
    let oldList = [...this.state.detailed_list];
    let newMovie = { id, title, poster_small };
    if (oldList) {
      console.log('this is empty');
      this.setState({ detailed_list: [newMovie] });
    }
    //check if existing movie being added already exists or is a new entry
    oldList.forEach(e => {
      console.log(`Matching X: ${e.id} with Y: ${id}`);
      if (e.id === id) {
        //how do we get rid of this nasty dupe?
        let filteredDupes = oldList.filter(e => e.id !== id);
        this.setState({ detailed_list: filteredDupes });
      } else {
        this.setState({ detailed_list: [...oldList, newMovie] });
      }
    });
  };

  render() {
    let favItems = [...this.state.detailed_list];

    return (
      <div className="App">
        <NavBar />
        <div className="main">
          <div className="fav-list">
            <h4>Movies you say you watch:</h4>
            {favItems.map(e => (
              <FavItem
                key={e.id}
                title={e.title}
                poster={e.poster_small}
                id={e.id}
              />
            ))}
          </div>
          <div className="main-right">
            <SearchField fetchResults={this.fetchResults} />
            {this.state.results && (
              <SearchResults
                results={this.state.results}
                updateFavList={this.updateFavList}
                updateDetailedList={this.updateDetailedList}
                favList={this.state.favList}
                detailed_list={this.state.detailed_list}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

// class FavItem extends Component {
//   render() {
//     return (
//       <div className="fav-item">
//         <p className="fav-title">{this.props.title}</p>
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//           <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z" />
//         </svg>
//         {/* <div className="fav-remove">X</div> */}
//         <img src={this.props.poster} alt="poster-img" />
//       </div>
//     );
//   }
// }

export default App;
