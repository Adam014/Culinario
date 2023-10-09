import { useState } from "react"
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const resetPassword = () => {
    const [error, setError] = useState(null);
    const redirect = useNavigate();

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        const emailValue = e.target.email.value;
        sendPasswordResetEmail(auth, emailValue)
        .then(() =>{
            alert("Check your email inbox")
        })
        .catch((error) => {
            setError(error)
        });
    };   

    const handleBack = () => {
        redirect("/")
    }

    return (
        <div className="reset-password-container">
            <div className="back-button">
                <button className="button" onClick={handleBack}>Get Back</button>
            </div>
            <h1>Reset Password</h1>
            <div className="email">
                <form className="forgot-form" onSubmit={(e) => handleSubmit(e)}>
                    <label>Enter email for password reset link<br />
                        <input type="email" placeholder="Enter your email" name="email"/>
                    </label><br />
                    <button className="button">Get link</button>
                </form>
            </div>
            { error && {error} }
        </div>
    )
}

export default resetPassword