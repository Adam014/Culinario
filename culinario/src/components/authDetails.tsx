import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './auth/login';
import SignUp from './auth/signUp';

const authDetails = ({ authUser }) => {
    const [showSignUp, setShowSignUp] = useState(false);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user){
                authUser(user);
            } else {
                authUser(null);
            }
        })
        return () => {
            listen();
        }
    }, []);

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
        <p>Created by Adam Stádník | Copyright 2023 All rights reserved. </p>
    </div>
  )
}

export default authDetails;