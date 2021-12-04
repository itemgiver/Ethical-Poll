import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6AD-wtSXckyZSVqIOKY6qwLX95mCI0QE",
  authDomain: "ethical-poll-website.firebaseapp.com",
  projectId: "ethical-poll-website",
  storageBucket: "ethical-poll-website.appspot.com",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
