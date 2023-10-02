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
            <h1 className="signup-title">Sign Up</h1>
            <form onSubmit={signUpWithEmailAndPassword}>
                <label>
                    Email<br />
                    <input type="email" placeholder="Enter your email" value={email} autoComplete="on" onChange={(e) => setEmail(e.target.value)} />
                </label><br />
                <label>
                    Password<br />
                    <input type="password" placeholder="Enter your password" value={password}onChange={(e) => setPassword(e.target.value)}  autoComplete="on"/>
                </label><br />
                <button>Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;
