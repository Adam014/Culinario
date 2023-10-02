import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginWithEmailAndPassword = (e: React.FormEvent) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
        })
        .catch((error) => {
            console.log(error)
        });
    };

    return (
        <div className="login-container">
            <h1 className="signup-title">Log In</h1>
            <form onSubmit={loginWithEmailAndPassword}>
                <label>
                    Email<br />
                    <input type="email" placeholder="Enter your email" value={email} autoComplete="on" onChange={(e) => setEmail(e.target.value)} />
                </label><br />
                <label>
                    Password<br />
                    <input type="password" placeholder="Enter your password" value={password}onChange={(e) => setPassword(e.target.value)}  autoComplete="on"/>
                </label><br />
                <button>Log In</button>
            </form>
        </div>
    )
}

export default login
