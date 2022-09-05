import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import * as Config from "./config.json";

const firebaseConfig = {
  apiKey: Config.NEXT_PUBLIC_FIREBASE_PUBLIC_KEY,
  authDomain: Config.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: Config.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: Config.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: Config.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: Config.NEXT_PUBLIC_APP_ID,
};

const App = initializeApp(firebaseConfig);
const DB = getFirestore(App);
const Auth = getAuth(App);

export { App, DB, Auth };
