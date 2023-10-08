import { useState } from "react"
import './App.sass'
import { User } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthDetails from './components/authDetails'
import Home from "./components/homePage";
import Profile from "./components/profile";

const App = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  console.log(authUser);

  return (
    <Router>
        <Routes>
          <Route
            path="/homepage"
            element={authUser ? <Home authUser={authUser} setAuthUser={setAuthUser} /> : <AuthDetails setAuthUser={setAuthUser} />}
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </Router>
  )
}

export default App
