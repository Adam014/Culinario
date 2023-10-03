import { useState } from "react"
import './App.sass'
import AuthDetails from './components/authDetails'
import RecipesPage from "./components/recipesPage";
import { signOut, User } from 'firebase/auth';
import { auth } from './firebase/firebase';

function App() {
  const [authUser, setAuthUser] = useState<User | null>(null);

  const userSignOut = () => {
        signOut(auth)
        .then(() => {
            console.log("Successfully signed out!")
            setAuthUser(null)
        })
        .catch((error) => console.log(error))
  }

  return (
    <>
      {authUser ? <RecipesPage /> : <AuthDetails setAuthUser={setAuthUser} />}
      {authUser && <button onClick={userSignOut}>Logout</button>}
    </>
  )
}

export default App
