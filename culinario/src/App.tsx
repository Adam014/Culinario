import './App.sass'
import Login from "./components/auth/login"
import SignUp from "./components/auth/signUp"
import AuthDetails from './components/authDetails'

function App() {

  return (
    <>
      <Login />
      <SignUp />
      <AuthDetails />
    </>
  )
}

export default App
