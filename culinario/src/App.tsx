import { useState } from "react"
import './App.sass'
import AuthDetails from './components/authDetails'
import Main from "./components/main";
import { signOut, User } from 'firebase/auth';
import { auth } from './firebase/firebase';
import { BrowserRouter as Router} from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";

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
    <Router>
      <div className={authUser ? "recipes-page-container" : "container"}>
        {authUser &&<Navbar />  }
        {authUser ? <Main /> : <AuthDetails setAuthUser={setAuthUser} />}
        {authUser && <Sidebar />}
        {authUser && <button onClick={userSignOut}>Logout</button>}
      </div>
    </Router>
  )
}

export default App
