import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const [email, setEmail] = useState(""); // State to store the email
const [error, setError] = useState<Error | null>(null);
    const redirect = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Check your email inbox");
        } catch (error) {
            const err = error as Error; // Type assertion to specify the type
            setError(err);
        }
    };

    const handleBack = () => {
        redirect("/");
    }

    return (
        <div className="reset-password-container">
            <div className="back-button">
                <button className="button" onClick={handleBack}>Get Back</button>
            </div>
            <h1>Reset Password</h1>
            <div className="email">
                <form className="forgot-form" onSubmit={handleSubmit}>
                    <label>Enter email for password reset link<br />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label><br />
                    <button className="button">Get link</button>
                </form>
            </div>
            {error && <div>{error.message}</div>}
        </div>
    );
};

export default ResetPassword;