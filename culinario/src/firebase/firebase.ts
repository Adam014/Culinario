import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDkvlsp-vcZfVtBJmbcBBmPPkzjKs01jNM",
  authDomain: "culinario-9e98b.firebaseapp.com",
  projectId: "culinario-9e98b",
  storageBucket: "culinario-9e98b.appspot.com",
  messagingSenderId: "299770184076",
  appId: "1:299770184076:web:6d10967f72f743f93bd6a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)