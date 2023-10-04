import { useEffect, useState } from 'react';
import { auth, signInWithGoogle } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth'; 
import Login from './auth/login';
import SignUp from './auth/signUp';
import {CulinarioLogo, Google} from "../images/images";

interface AuthDetailsProps {
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const authDetails: React.FC<AuthDetailsProps> = ({ setAuthUser }) => {
    const [showSignUp, setShowSignUp] = useState(false);
    const currentYear = new Date().getFullYear()

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user){
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }
        });
        return () => {
            listen();
        };
    }, []);

    const toggleForm = () => {
        setShowSignUp(!showSignUp);
    };

  return (
   <div className='login-signup-container'>
        <div className='form'>
            <div className='title-container'>
                <img src={CulinarioLogo}  alt='culinario-logo'/>
            </div>
            <div className='form-container'>
                {showSignUp ? <SignUp /> : <Login />}
            </div>
            <p className='account-container'>
                {showSignUp ? "Already have an account? " : "Don't have an account? "}
                <span onClick={toggleForm} className="here-link">
                    {showSignUp ? "Login here" : "Create one here"}
                </span>
            </p>
            {/* <p className='reset-password' onClick={handleReset}>Reset password</p> */}
        </div>
        <div className='other-login-options'> 
            <h3>{showSignUp ? "Sign up with other providers" : "Login with other providers"}</h3>
            <button onClick={signInWithGoogle} className='button-google'>
                <img src={Google} alt="google-login-icon" />    
            </button>
        </div>
        <div className='footer-container'>
            <p>Created by Adam Stádník | MIT License | Copyright (c) {currentYear} Adam Stádník </p>
        </div>
    </div>
  )
}

export default authDetails;