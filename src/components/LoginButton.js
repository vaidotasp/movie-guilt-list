import React, { Component } from 'react';
import firebase from 'firebase';
import { firebaseApp } from '../base';

class LoginButton extends Component {
  //button also needs to be aware if user is logged in or not
  //handles the login flow with Firebase
  authHandler = async authData => {
    console.log(authData);
    console.log(authData.user.displayName);
    const user = authData.user.displayName;
    this.props.logButtonHandler(user);
  };

  loginHandler = () => {
    console.log(`Login Clicked`);
    const authProvider = new firebase.auth.GoogleAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logoutHandler = async () => {
    console.log('Logout Clicked');
    await firebase
      .auth()
      .signOut()
      .then(this.props.logButtonHandler(null));

    //may need to clear state here?
  };

  render() {
    return (
      <div>
        {this.props.user ? (
          //user is logged in -> handle user state
          <button onClick={this.logoutHandler} className="button button-login">
            logout
          </button>
        ) : (
          //user is logged OUT -> handle user state
          <button onClick={this.loginHandler} className="button button-login">
            login
          </button>
        )}
      </div>
    );
  }
}

export default LoginButton;
