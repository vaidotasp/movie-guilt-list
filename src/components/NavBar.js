import React, { Component } from 'react';
import LoginButton from './LoginButton';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <h1>Movie Guilt List</h1>
        <div className="login-section">
          <LoginButton />
          <p id="user">User Placeholder</p>
        </div>
      </nav>
    );
  }
}

export default NavBar;
