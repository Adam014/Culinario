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
            <form onSubmit={loginWithEmailAndPassword}>
                <label>
                    Email
                    <input type="email" placeholder="Enter your email" value={email} autoComplete="on" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password
                    <input type="password" placeholder="Enter your password" value={password}onChange={(e) => setPassword(e.target.value)}  autoComplete="on"/>
                </label>
                <button>Log In</button>
            </form>
        </div>
    )
}

export default login
