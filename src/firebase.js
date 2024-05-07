// src/firebaseConfig.js

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbNcsjLypYSF58_sXlS5pJyVGsohFlUqg",
  authDomain: "intelliroads-d36f2.firebaseapp.com",
  projectId: "intelliroads-d36f2",
  storageBucket: "intelliroads-d36f2.appspot.com",
  messagingSenderId: "453942531856",
  appId: "1:453942531856:web:b85dd11eef23c3576ef795",
  measurementId: "G-1VH9HT508R"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
export const storage = firebase.storage();

export default firebase;
