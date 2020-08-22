import firebase from "firebase";

var config = {
  apiKey: "AIzaSyAyKn2qxN-kkrJ4dmaBJmXJt19KaGdmAew",
  authDomain: "malla-shop.firebaseapp.com",
  databaseURL: "https://malla-shop.firebaseio.com",
  projectId: "malla-shop",
  storageBucket: "malla-shop.appspot.com",
  messagingSenderId: "849576884362",
  appId: "1:849576884362:web:e3299c72c0f47cb6081573",
};

firebase.initializeApp(config);

export const auth = firebase.auth;

export const signin = (email, password) =>
  auth().signInWithEmailAndPassword(email, password);

export const database = firebase.database();

export const storage = firebase.storage();
