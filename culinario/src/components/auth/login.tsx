import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginWithEmailAndPassword = (e: React.FormEvent<HTMLFormElement>) => {
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
        <section>
            <div className="login-container">
                <form onSubmit={loginWithEmailAndPassword}>
                    <h1>Log In to your account</h1>
                    <input type="email" placeholder="Enter your email" value={email} autoComplete="on" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Enter your password" value={password}onChange={(e) => setPassword(e.target.value)}  autoComplete="on"/>
                    <button>Log In</button>
                </form>
            </div>
        </section>
    )
}

export default login
