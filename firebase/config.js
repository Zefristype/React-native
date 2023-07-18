import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDoo6gay6mFcT74-L-h4QgVmcs1dxRtuaU",
  authDomain: "react-native-app-84156.firebaseapp.com",
  projectId: "react-native-app-84156",
  storageBucket: "react-native-app-84156.appspot.com",
  messagingSenderId: "410573747142",
  appId: "1:410573747142:web:c752726dcb966e8554f8c7",
  measurementId: "G-7EKC5SNCCN",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
