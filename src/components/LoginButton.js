import React, { Component } from 'react';

class LoginButton extends Component {
  //button also needs to be aware if user is logged in or not
  //handles the login flow with Firebase
  loginHandler = () => {
    console.log(`Login Clicked`);
    console.log(this);
  };

  render() {
    return (
      <button onClick={this.loginHandler} className="button button-login">
        login
      </button>
    );
  }
}

export default LoginButton;
