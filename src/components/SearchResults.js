import React, { Component } from 'react';
import MovieCard from './MovieCard';

class SearchResults extends Component {
  render() {
    let fetchedMovies = this.props.results;
    return (
      <div className="search-container">
        <h3>Search Results:</h3>
        {fetchedMovies.length === 0 ? <p>No Movies Found</p> : true}
        <ul>
          {fetchedMovies.map(e => (
            <MovieCard
              movie={e}
              key={e.id}
              updateFavList={this.props.updateFavList}
              updateDetailedList={this.props.updateDetailedList}
              favList={this.props.favList}
              detailed_list={this.props.detailed_list}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default SearchResults;
