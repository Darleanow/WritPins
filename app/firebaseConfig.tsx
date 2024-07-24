// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // TODO: Use if necessary
import { getAuth } from "firebase/auth";

// TODO: Make a decision about storage provider
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGcTYCLuyaFo8GROrOcIylhf4IODj4_kk",
  authDomain: "writ-pinsv2.firebaseapp.com",
  projectId: "writ-pinsv2",
  storageBucket: "writ-pinsv2.appspot.com",
  messagingSenderId: "468812756909",
  appId: "1:468812756909:web:0064543bfe650d7ca95324",
  measurementId: "G-TR7B6HXY81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);
// const analytics = getAnalytics(app); // TODO: Use if necessary

export { app, auth }; //db, storage