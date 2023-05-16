import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAUisiG3SDCcFZfpKimnghJ3n_VdgMOeqU",
  authDomain: "graduation-project-2e021.firebaseapp.com",
  databaseURL: "https://graduation-project-2e021-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "graduation-project-2e021",
  storageBucket: "graduation-project-2e021.appspot.com",
  messagingSenderId: "290471180510",
  appId: "1:290471180510:web:ad0d4a233b63076aeaea4f",
  measurementId: "G-CKC9QTXMMW"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize database
export const db = getDatabase(app);