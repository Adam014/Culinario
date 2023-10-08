import { useEffect, useState } from 'react';
import { auth, providerGitHub, providerGoogle } from '../firebase/firebase';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { User } from 'firebase/auth'; 
import Login from './auth/login';
import SignUp from './auth/signUp';
import {CulinarioLogo, Google, GitHub } from "../images/images";
import { useNavigate } from 'react-router-dom';

interface AuthDetailsProps {
    authUser: User | null; 
    setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const authDetails: React.FC<AuthDetailsProps> = ({ authUser, setAuthUser }) => {
    const redirect = useNavigate();
    const [showSignUp, setShowSignUp] = useState(false);
    const currentYear = new Date().getFullYear()
    const [error, setError] = useState<string | null>(null);

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

    const signInWithGithub = () => {
        signInWithPopup(auth, providerGitHub)
        .then(() => {

        }).catch((error) => {
            console.log(error)
            setError(error)
        });
    };

    const signInWithGoogle = () => {
        signInWithPopup(auth, providerGoogle)
        .then(() => {

        }).catch((error) => {
            console.log(error)
            setError(error)
        });
    };

    const handleReset = () => {
        redirect("/reset-password")
    }  

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
                { /* add reset button */ }
                <p className='reset-password' onClick={handleReset}>Forgot password?</p>
            </div>
            <div className='other-login-options'> 
                <h3>{showSignUp ? "Sign up with other providers" : "Login with other providers"}</h3>
                <div className='providers'>
                    <button onClick={signInWithGoogle} className='button-google'>
                        <img src={Google} alt="google-login-icon" />    
                    </button>
                    <button onClick={signInWithGithub} className='button-github'>
                        <img src={GitHub} alt='github-login-icon'/>
                    </button>
                    <div className="error-container">
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </div>
            </div>
            <div className='footer-container'>
                <p>Created by Adam Stádník | MIT License | Copyright (c) {currentYear} Adam Stádník </p>
            </div>
        </div>
  )
}

export default authDetails;