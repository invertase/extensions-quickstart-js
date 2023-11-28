import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBltdm_85Dn4MqQtC5nCUK7eV2lkQtmOhM",
  authDomain: "devrel-extensions-testing.firebaseapp.com",
  projectId: "devrel-extensions-testing",
  storageBucket: "devrel-extensions-testing.appspot.com",
  messagingSenderId: "859145064463",
  appId: "1:859145064463:web:120f24d3d1ac7e153c937a",
  measurementId: "G-95NZVPRQQQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storageRef = getStorage(app);
const firestoreRef = getFirestore(app);
const analyticsRef = getAnalytics(app);
const functionsRef = getFunctions(app);
const authRef = getAuth(app);

export { storageRef, analyticsRef, firestoreRef, authRef, functionsRef, app };
