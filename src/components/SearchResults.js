import React, { Component } from 'react';
import MovieCard from './MovieCard';

class SearchResults extends Component {
  render() {
    let fetchedMovies = this.props.results;
    return (
      <div className="search-container">
        <h3>Search Results:</h3>
        <ul>
          {fetchedMovies.map(e => (
            <MovieCard
              movie={e}
              key={e.id}
              updateFavList={this.props.updateFavList}
              favList={this.props.favList}
            />
          ))}
        </ul>
        {/* we would need to loop and extract and pass key values here */}
        {/* <MovieCard movie={this.props.results[0]} /> */}
      </div>
    );
  }
}

export default SearchResults;
