import { useState } from "react"
import './App.sass'
import AuthDetails from './components/authDetails'
import MainPage from "./components/mainPage";
import { signOut } from 'firebase/auth';
import { auth } from './firebase/firebase';

function App() {
  const [authUser, setAuthUser] = useState(null);

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
      {authUser ? <MainPage /> : <AuthDetails authUser={(user) => setAuthUser(user)}/>}
      <button onClick={userSignOut}>Logout</button>
    </>
  )
}

export default App
