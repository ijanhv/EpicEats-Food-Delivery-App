import { initializeApp } from "firebase/app";

import { child, getDatabase,  ref, set, get } from "firebase/database";

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
export const _ = initializeApp(firebaseConfig);
const db = getDatabase()
const dbRef = ref(db)

export const saveToken = async (userId, token) => {
    const values = (await get(child(dbRef, `userTokens/${userId}`))).val() ?? {}
    const payload = {...values, [token]: true}
    set(ref(db, `userTokens/${userId}`), payload)
}
