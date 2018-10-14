import React, { Component } from 'react';
import MovieCard from './MovieCard';

class SearchResults extends Component {
  render() {
    const fetchedMovies = this.props.results;
    return (
      <div className="search-container">
        <h3>Search Results:</h3>
        {fetchedMovies.length === 0 ? <p>No Movies Found</p> : true}
        <ul>
          {fetchedMovies.map(e => (
            <MovieCard
              movie={e}
              key={Date.now() + Math.random(1, 9)}
              updateDetailedList={this.props.updateDetailedList}
              detailed_list={this.props.detailed_list}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default SearchResults;
