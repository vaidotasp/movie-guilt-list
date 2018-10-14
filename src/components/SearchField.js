import React, { Component } from 'react';

class SearchField extends Component {
  constructor() {
    super();
    this.state = {
      currentInput: ''
    };
  }

  searchIconHandler = () => {
    const queryVal = this.state.currentInput;
    this.props.fetchResults(queryVal);
  };

  searchInputHandler = e => {
    this.setState({ currentInput: e.target.value });
  };

  searchEnterHandler = e => {
    if (e.key === 'Enter') {
      console.log('enter key was pressed');
      let queryVal = e.target.value;
      this.props.fetchResults(queryVal);
    }
    return;
  };

  render() {
    return (
      <div className="search-component">
        <input
          onInput={this.searchInputHandler}
          onKeyUp={this.searchEnterHandler}
          placeholder="Search..."
          type="search"
          name="search"
          id="search"
          autoComplete="off"
        />
        <div className="search-icon" onClick={this.searchIconHandler}>
          <img src="/search.svg" alt="search-icon" />
        </div>
      </div>
    );
  }
}

export default SearchField;
