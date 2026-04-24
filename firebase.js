import { db } from "../../firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAd5qoFZMVKV-hkIB6375kaRchoN763b3Y",
  authDomain: "homepath-12571.firebaseapp.com",
  projectId: "homepath-12571"
};

export const db = getFirestore(app);
