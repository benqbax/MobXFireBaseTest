import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDbiug52fnoRCF4RQbueJa6M0CbVNUOL6o",
    authDomain: "mobxtesting.firebaseapp.com",
    databaseURL: "https://mobxtesting.firebaseio.com",
    projectId: "mobxtesting",
    storageBucket: "",
    messagingSenderId: "245327137280"
  };
  firebase.initializeApp(config);


  const root = firebase.database().ref();
  const reff = firebase.database();
  const contacts = firebase.database().ref('contacts');


  const Fb = {
      reff,
      root,
      contacts
  };

  export { Fb };