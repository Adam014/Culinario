import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

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
export const auth = getAuth(app);

const providerGoogle = new GoogleAuthProvider();
const providerGitHub = new GithubAuthProvider();

export const signInWithGithub = () => {
  signInWithPopup(auth, providerGitHub)
  .then(() => {

  }).catch((error) => {
    console.log(error)
  });
}

export const signInWithGoogle = () => {
   signInWithPopup(auth, providerGoogle)
  .then(() => {

  }).catch((error) => {
    console.log(error)
  });
};