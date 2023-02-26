// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUisiG3SDCcFZfpKimnghJ3n_VdgMOeqU",
  authDomain: "graduation-project-2e021.firebaseapp.com",
  projectId: "graduation-project-2e021",
  storageBucket: "graduation-project-2e021.appspot.com",
  messagingSenderId: "290471180510",
  appId: "1:290471180510:web:ad0d4a233b63076aeaea4f",
  measurementId: "G-CKC9QTXMMW"
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);


const auth = getAuth(app);

export { auth };
