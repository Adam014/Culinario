import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './auth/login';
import SignUp from './auth/signUp';

const authDetails = () => {

    const [authUser, setAuthUser] = useState(null);
    const [showSignUp, setShowSignUp] = useState(false);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user){
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        })
        return () => {
            listen();
        }
    }, []);


    const userSignOut = () => {
        signOut(auth)
        .then(() => {
            console.log("Successfully signed out!")
        })
        .catch((error) => console.log(error))
    }

    const toggleForm = () => {
        setShowSignUp(!showSignUp);
    };

  return (
   <div className='container'>
        <div className='form'>
            <h1 className='form-title'>Culinario</h1>
            <div className='form-container'>
                {showSignUp ? <SignUp /> : <Login />}
            </div>
            <p>
                {showSignUp ? "Already have an account? " : "Don't have an account? "}
                <span onClick={toggleForm} className="here-link">
                    {showSignUp ? "Login here" : "Create one here"}
                </span>
            </p>
        </div>
    </div>
  )
}

export default authDetails
