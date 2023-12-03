// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCTZsjKTY_8VgXEzAgOLIJqCCIV4mxeBWk",
  authDomain: "calendar-f850e.firebaseapp.com",
  projectId: "calendar-f850e",
  storageBucket: "calendar-f850e.appspot.com",
  messagingSenderId: "843229410868",
  appId: "1:843229410868:web:9d37be74566eeaf4b37c61",
  measurementId: "G-5HSCGJY3BT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
export default db;
