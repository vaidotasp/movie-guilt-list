import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBtBcACW-Hca7iFF58G0NkBPotgl9dcLZ4',
  authDomain: 'movie-guilt-list.firebaseapp.com',
  databaseURL: 'https://movie-guilt-list.firebaseio.com'
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
