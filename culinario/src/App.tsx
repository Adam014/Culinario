import { useState } from "react"
import './App.sass'
import { User } from 'firebase/auth';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthDetails from './components/authDetails'
import Home from "./components/mainBlog";

const App = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  console.log(authUser)

  return (
    <Router>
      <div className={authUser ? "recipes-page-container" : "container"}>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home authUser={authUser} setAuthUser={setAuthUser} /> : <AuthDetails setAuthUser={setAuthUser} />}
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
