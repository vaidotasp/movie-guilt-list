import React, { Component } from 'react';
import LoginButton from './LoginButton';

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar">
        <h1>Movie Guilt List</h1>
        <div className="login-section">
          <LoginButton
            user={this.props.user}
            logButtonHandler={this.props.logButtonHandler}
          />
          {this.props.user ? (
            <p id="user">Hello {this.props.user}</p>
          ) : (
            <p id="user">Hello Anonymous</p>
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
