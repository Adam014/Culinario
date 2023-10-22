import { useState, useEffect } from "react"
import './App.sass'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import AuthDetails from './components/auth/authDetails'
import Home from "./components/homePage";
import Profile from "./components/profile";
import ResetPassword from "./components/ResetPasword/resetPassword";
import Favorites from "./components/Favorites";
import Recipes from "./components/Recipes";
import RecipeDetails from "./components/services/recipeDetails";

import { User } from 'firebase/auth';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";

const App = () => {
  // setting the state for user information
  const [authUser, setAuthUser] = useState<User | null>(null);

  // useEffect for logging and checking if user is logged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
        <Routes>
          <Route path="/" element={authUser ? <Home authUser={authUser} setAuthUser={setAuthUser} /> : <AuthDetails setAuthUser={setAuthUser} authUser={authUser}/>} />
          <Route path="/profile" element={<Profile authUser={authUser} setAuthUser={setAuthUser} />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/favorites" element={<Favorites authUser={authUser} setAuthUser={setAuthUser}/>} />
          <Route path="/recipes" element={<Recipes authUser={authUser} setAuthUser={setAuthUser}/>} />
        </Routes>
    </Router>
  )
}

export default App
