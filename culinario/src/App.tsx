import { useState } from "react"
import './App.sass'
import AuthDetails from './components/authDetails'
import MainPage from "./components/mainPage";
import { signOut } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { User } from 'firebase/auth';

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
      {authUser ? <MainPage /> : <AuthDetails setAuthUser={setAuthUser} />}
      <button onClick={userSignOut}>Logout</button>
    </>
  )
}

export default App
