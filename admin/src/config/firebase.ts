
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD5-WDWAHvutK4llXRkffj3N3OoGtzFGZc",
  authDomain: "epiceats-cb85f.firebaseapp.com",
  projectId: "epiceats-cb85f",
  storageBucket: "epiceats-cb85f.appspot.com",
  messagingSenderId: "135546057479",
  appId: "1:135546057479:web:e3079209bb558b04a7cba2",
  measurementId: "G-3R749V8792"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage =  getStorage(app)
