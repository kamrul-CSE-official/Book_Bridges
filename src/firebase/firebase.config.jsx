import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnQqx5TQqV0vIl1i-7w_i7SqwCB8WYIGs",
  authDomain: "book-bridges.firebaseapp.com",
  projectId: "book-bridges",
  storageBucket: "book-bridges.appspot.com",
  messagingSenderId: "608736944468",
  appId: "1:608736944468:web:704b49ef38b59bf46628c1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
