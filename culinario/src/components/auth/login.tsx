import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { OpenEye, ClosedEye } from "../../images/images";

const login = () => {
    // setting the state for email
    const [email, setEmail] = useState('');

    // setting the state for password
    const [password, setPassword] = useState('');

    // setting the state for
    const [error, setError] = useState<string | null>(null);

    // setting the state to show the password
    const [showPassword, setShowPassword] = useState(false);

    // function for button to login with email and password
    const loginWithEmailAndPassword = (e: React.FormEvent) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
        })
        .catch((error) => {
            console.log(error)
            setError(error.message);
        });
    };

    // function to show the password
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
                            src={showPassword ? OpenEye : ClosedEye}
                            alt="Toggle password visibility"
                            onClick={togglePasswordVisibility}
                        />
                    </div>
                </label><br />
                <button>Log In →</button>
            </form>
            <div className="error-container">
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    )
}

export default login
