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
        <section>
            <div className='container'>
                <h1 className='form-title'>Culinario</h1>
                <div className='form-container'>
                    {showSignUp ? <SignUp /> : <Login />}
                </div>
                <p>
                    {authUser ? "Already have an account? " : "Don't have an account? "}
                    {authUser ? (
                        <>Log in to your account <span onClick={toggleForm} className="here-link">here</span></>
                    ) : (
                        <>Create one <span onClick={toggleForm} className="here-link">here</span></>
                    )}
                </p>
            </div>
            {authUser ? <p>{`Signed In as ${authUser.email}`}</p> : <p>Logged out</p>}
            {authUser && <button onClick={userSignOut}>Sign Out</button>}
        </section>
  )
}

export default authDetails
