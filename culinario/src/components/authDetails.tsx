import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const authDetails = () => {

    const [authUser, setAuthUser] = useState(null);

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

  return (
    <div>
        { authUser ? <p>{`Signed In as ${authUser.email}`}</p> : <p>Logged out</p>}
        { authUser ? <button onClick={userSignOut}>Sign Out</button> : "" }
    </div>
  )
}

export default authDetails
