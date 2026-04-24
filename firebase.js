import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAd5qoFZMVKV-hkIB6375kaRchoN763b3Y",
  authDomain: "homepath-12571.firebaseapp.com",
  projectId: "homepath-12571",
  storageBucket: "homepath-12571.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

// ✅ THIS is your database
export const db = getFirestore(app);
