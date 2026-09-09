import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF8W0Zg7zHziy8ey09J5BUYrJE5oaGH3s",
  authDomain: "investment-300c6.firebaseapp.com",
  projectId: "investment-300c6",
  databaseURL: "https://investment-300c6-default-rtdb.firebaseio.com",
  storageBucket: "investment-300c6.firebasestorage.app",
  messagingSenderId: "636992489312",
  appId: "1:636992489312:web:07924f40bad1f132a5c005"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export {auth, database};
