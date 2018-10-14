import React, { Component } from 'react';
import '../css/style.css';
import NavBar from './NavBar';
import SearchField from './SearchField';
import SearchResults from './SearchResults';
import FavItem from './FavItem';
import Footer from './Footer';
import base from '../base';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentSearch: '',
      results: '',
      detailed_list: [],
      user: null
    };
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
      })
      .catch(err => console.error(err));
    this.setState({ currentSearch: currentSearch });
  };

  removeFav = id => {
    let oldList = [...this.state.detailed_list];
    let filterFavs = oldList.filter(e => e.id !== id);
    this.setState({ detailed_list: filterFavs });
  };

  updateDetailedList = (id, title, poster_small) => {
    let oldList = [...this.state.detailed_list];
    let newMovie = { id, title, poster_small };
    if (oldList) {
      console.log('this is empty');
      this.setState({ detailed_list: [newMovie] });
    }
    //check if existing movie being added already exists or is a new entry
    for (let i = 0; i < oldList.length; i++) {
      if (id === oldList[i]['id']) {
        let filteredDupes = oldList.filter(e => e.id !== id);
        console.log(`This is what filtered list looks like: ${filteredDupes}`);
        this.setState({ detailed_list: filteredDupes });
        return;
      } else if (id !== oldList[i]['id']) {
        this.setState({ detailed_list: [...oldList, newMovie] });
      }
    }
  };

  logButtonHandler = async user => {
    if (user) {
      this.setState({ user: user });
      //this should populate with firebase data???
      const favs = await base.fetch(this.state.user, { context: this });
      // console.log(favs);
      this.setState({ detailed_list: favs });
      this.ref = base.syncState(`${this.state.user}/detailed_list`, {
        context: this,
        state: 'detailed_list',
        asArray: true
      });
    } else {
      base.removeBinding(this.ref);
      this.setState({ user: null });
      this.setState({ detailed_list: [] });
    }
  };

  render() {
    let favItems = [...this.state.detailed_list];

    return (
      <div className="App">
        <NavBar
          user={this.state.user}
          logButtonHandler={this.logButtonHandler}
        />
        <div className="main-wrapper">
          <div className="fav-list">
            <h4>Movies you save will appear here</h4>
            {favItems.map(e => (
              <FavItem
                key={e.id + 1}
                title={e.title}
                poster={e.poster_small}
                id={e.id}
                removeFav={this.removeFav}
              />
            ))}
          </div>
          <div className="main-left">
            <SearchField fetchResults={this.fetchResults} />
            {this.state.results && (
              <SearchResults
                results={this.state.results}
                updateDetailedList={this.updateDetailedList}
                detailed_list={this.state.detailed_list}
              />
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
