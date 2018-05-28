import React, { Component } from 'react';

class SearchField extends Component {
  //search field should be keeping track of typing, focus, and making api calls?/filtering?
  constructor() {
    super();
    this.state = {
      currentInput: ''
    };
  }

  searchIconHandler = () => {
    let queryVal = this.state.currentInput;
    this.props.fetchResults(queryVal);
  };

  searchInputHandler = e => {
    this.setState({ currentInput: e.target.value });
    //we would need to update the state with each keypress
  };
  searchEnterHandler = e => {
    if (e.key === 'Enter') {
      console.log('enter key was pressed');
      let queryVal = e.target.value;
      this.props.fetchResults(queryVal);
    }
    return;
  };
  //dynamic searching to be implemented -- either by dynamic api call ? or filter call (prefetch?)
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
        {/* //this is temporary representation of dynamic filter typing */}
        {/* <p id="search-output">{this.state.currentInput}</p> */}
      </div>
    );
  }
}

export default SearchField;
