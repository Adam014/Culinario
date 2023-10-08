import { useState } from "react"
import './App.sass'
import { User } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AuthDetails from './components/authDetails'
import Home from "./components/homePage";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPasword/resetPassword";

const App = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  // console.log(authUser);

  return (
    <Router>
        <Routes>
          <Route path="/" element={authUser ? <Home authUser={authUser} setAuthUser={setAuthUser} /> : <AuthDetails setAuthUser={setAuthUser} authUser={authUser}/>} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    </Router>
  )
}

export default App
