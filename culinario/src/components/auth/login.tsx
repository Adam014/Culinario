import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import openEye from "../../images/opened-eye.png";
import closedEye from "../../images/closed-eye.png";

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const loginWithEmailAndPassword = (e: React.FormEvent) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential)
        })
        .catch((error) => {
            console.log(error)
             setError(error.message);
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Log In</h1>
            <form onSubmit={loginWithEmailAndPassword}>
                <label>
                    Email<br />
                    <input type="email" placeholder="Enter your email" value={email} autoComplete="on" onChange={(e) => setEmail(e.target.value)} required/>
                </label><br />
                <label>
                    Password<br />
                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="on"
                            required
                        />
                        <img
                            className="password-visibility"
                            src={showPassword ? openEye : closedEye}
                            alt="Toggle password visibility"
                            onClick={togglePasswordVisibility}
                        />
                    </div>
                </label><br />
                <button>Log In</button>
            </form>
            <div className="error-container">
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    )
}

export default login
