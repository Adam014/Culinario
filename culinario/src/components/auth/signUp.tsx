import { useState } from "react";
import { auth } from "../../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { OpenEye, ClosedEye } from "../../images/images";

const SignUp = () => {
    // fix it maybe for one variables - fixing duplicity

    // setting the state for email
    const [email, setEmail] = useState('');

    // setting the state for password
    const [password, setPassword] = useState('');

    // setting the state to show the errors
    const [error, setError] = useState<string | null>(null);

    // setting the state for showing password
    const [showPassword, setShowPassword] = useState(false);

    // function for signing with email and password
    const signUpWithEmailAndPassword = (e: React.FormEvent) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
        })
        .catch((error) => {
            console.log(error)
            setError(error.message);
        });
    };

    // fixing with only one function - duplicity
    // function for seeing the password
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
                            src={showPassword ? OpenEye : ClosedEye}
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
