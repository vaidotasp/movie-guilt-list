import React, { Component } from 'react';
import '../css/style.css';
import NavBar from './NavBar';
import SearchField from './SearchField';
import SearchResults from './SearchResults';
import base from '../base';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentSearch: '',
      results: '',
      favList: [11888, 58595]
    };
  }

  componentDidMount() {
    // this.ref = base.syncState(`url`, {
    //   context: this,
    //   state: 'favList'
    // });
  }

  componentWillUnmount() {
    // base.removeBinding(this.ref);
  }

  fetchResults = currentSearch => {
    console.log('fetch results function sequence fired');
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=18e7f830daa0fee62baf2bf7fa436d48&include_adult=false&page=1&query=${currentSearch}`
    )
      .then(response => response.json())
      .then(data => {
        //console.log(data.results);
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
        console.log(filteredList);
        this.setState({ results: filteredList });
      });
    this.setState({ currentSearch: currentSearch });
  };

  //Add or remove movie to the fav list
  updateFavList = id => {
    console.log(id);
    let oldList = [...this.state.favList];
    if (!oldList.includes(id)) {
      console.log('it doeesss not!11');
      this.setState({ favList: [...this.state.favList, id] });
    } else {
      console.log('it exiiiiisstttt');
    }
  };

  render() {
    return (
      <div className="App">
        <NavBar />
        <SearchField fetchResults={this.fetchResults} />
        {this.state.results && (
          <SearchResults
            results={this.state.results}
            updateFavList={this.updateFavList}
            favList={this.state.favList}
          />
        )}
      </div>
    );
  }
}

export default App;
