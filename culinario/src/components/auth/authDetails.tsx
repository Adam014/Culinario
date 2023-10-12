import { useEffect, useState } from 'react';
import { auth, providerGitHub, providerGoogle } from '../../firebase/firebase';
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { User } from 'firebase/auth'; 
import Login from './login';
import SignUp from './signUp';
import {CulinarioLogo, Google, GitHub } from "../../images/images";
import { useNavigate } from 'react-router-dom';

// passing throught props and defining its types
interface AuthDetailsProps {
    authUser: User | null; 
    setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const authDetails: React.FC<AuthDetailsProps> = ({ setAuthUser }) => {
    // defining redirect 
    const redirect = useNavigate();

    // defining a state to show signup
    const [showSignUp, setShowSignUp] = useState(false);

    // getting the current year
    const currentYear = new Date().getFullYear()

    // defining a state for errors
    const [error, setError] = useState<string | null>(null);

    // useffect to log in and sign up
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

    // function to show signup
    const toggleForm = () => {
        setShowSignUp(!showSignUp);
    };

    // function to login/signup with github
    const signInWithGithub = () => {
        signInWithPopup(auth, providerGitHub)
        .then(() => {

        }).catch((error) => {
            console.log(error)
            setError(error)
        });
    };

    // function to login/signup with google
    const signInWithGoogle = () => {
        signInWithPopup(auth, providerGoogle)
        .then(() => {

        }).catch((error) => {
            console.log(error)
            setError(error)
        });
    };

    // function for redirecting to reset-password
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