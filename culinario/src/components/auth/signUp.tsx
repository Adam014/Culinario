import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUpWithEmailAndPassword = (e: React.FormEvent) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
        })
        .catch((error) => {
            console.log(error)
        });
    };

    return (
        <div className="signup-container">
            <form onSubmit={signUpWithEmailAndPassword}>
                <label>
                    Email
                    <input type="email" placeholder="Enter your email" value={email} autoComplete="on" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password
                    <input type="password" placeholder="Enter your password" value={password}onChange={(e) => setPassword(e.target.value)}  autoComplete="on"/>
                </label>
                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;
