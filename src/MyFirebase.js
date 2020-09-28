import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjELTx-OJfwip0CqhSnrMg1Aols0EKvPA",
  authDomain: "mywhatsapp-256e7.firebaseapp.com",
  databaseURL: "https://mywhatsapp-256e7.firebaseio.com",
  projectId: "mywhatsapp-256e7",
  storageBucket: "mywhatsapp-256e7.appspot.com",
  messagingSenderId: "194143465083",
  appId: "1:194143465083:web:6959c50ad80589e4ac7cde",
  measurementId: "G-4HXQR1WV6H",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
