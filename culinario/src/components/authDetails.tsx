import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { User } from 'firebase/auth'; 
import Login from './auth/login';
import SignUp from './auth/signUp';
import CulinarioLogo from "../images/culinario-logo.png";

interface AuthDetailsProps {
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const authDetails: React.FC<AuthDetailsProps> = ({ setAuthUser }) => {
    const [showSignUp, setShowSignUp] = useState(false);
    const year = new Date().getFullYear()

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
   <div className='container'>
        <div className='form'>
            <div className='title-container'>
                <img src={CulinarioLogo}  alt='culinario-logo'/>
            </div>
            <div className='form-container'>
                {showSignUp ? <SignUp /> : <Login />}
            </div>
            <p className='account-container'>
                {showSignUp ? "Already have an account? Login" : "Don't have an account? "}
                <span onClick={toggleForm} className="here-link">
                    {showSignUp ? "Login here" : "Create one here"}
                </span>
            </p>
        </div>
        <p>Created by Adam Stádník | MIT License | Copyright (c) {year} Adam Stádník </p>
    </div>
  )
}

export default authDetails;