import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import openEye from "../../images/opened-eye.png";
import closedEye from "../../images/closed-eye.png";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const signUpWithEmailAndPassword = (e: React.FormEvent) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
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
        <div className="signup-container">
            <h1 className="signup-title">Sign Up</h1>
            <form onSubmit={signUpWithEmailAndPassword}>
                <label>
                    Email<br />
                    <input type="email" placeholder="Enter your email" value={email} autoComplete="on" onChange={(e) => setEmail(e.target.value)} required/>
                </label><br />
                <label>
                    Password<br />
                    <div className="password-input">
                        <input 
                            type="password" 
                            placeholder="Enter your password" 
                            value={password}onChange={(e) => setPassword(e.target.value)}  
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
                <button>Sign Up</button>
            </form>
            <div className="error-container">
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    )
}

export default SignUp;
