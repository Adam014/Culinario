import { useState, useEffect } from "react"
import { User } from "firebase/auth";
import { ProfileIcon } from "../images/images";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import { getProfileInfo } from './auth/authUtils';
import { formatDateTime } from "../utils/db";

// passing throught props and defining its types
interface ProfileProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const profile: React.FC<ProfileProps> = ({ authUser , setAuthUser } : ProfileProps) => {
  const redirect = useNavigate();
  const [loading, setLoading] = useState(true);
  const { imgSrc } = getProfileInfo(authUser);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const createdAt = formatDateTime(authUser?.metadata?.creationTime);
  const lastSignInTime = formatDateTime(authUser?.metadata?.lastSignInTime);

  const handleReset = () => redirect("/reset-password");

  return (
     <Layout authUser={authUser} setAuthUser={setAuthUser} >
        <main className="profile">
          {/* add custom card skeleton */}
          {loading ? (
          
          <div id="container">
            <div id="square" className="shimmer"></div> 
            <div id="content">
              <div id="content-title" className="shimmer"></div>
              <div id="content-desc">
                <div className="line shimmer"></div>
                <div className="line shimmer"></div>
                <div className="line shimmer"></div>
                <div className="line shimmer"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="title-text">
              <h1>Your Profile</h1>
              <h4 onClick={handleReset} className="reset-passwd">Reset your password here</h4>
            </div>
            <div className="default-user-info">
              <div className="profile-img-container">
                {/* cleaner code, saving everything to variables */}
                <img src={imgSrc || ProfileIcon} alt="profile-picture" />
              </div>

              <div className="title-user-info">
                {authUser?.displayName && <h2>{authUser?.providerData && authUser?.providerData.length > 0 && authUser?.providerData[0].providerId === "google.com" || "github-com" ? `${authUser?.displayName}` : `${authUser?.email}`}</h2>}
                <p>Account created at: {createdAt}</p>
                <p>Email: {authUser?.email}</p>
                <p>uid: {authUser?.uid}</p>
                <p>Provider: {authUser?.providerData[0].providerId}</p>
              </div>
            </div>
            <h3 className="last-login">Last login: {lastSignInTime}</h3>
          </>
        )}
        </main>
      </Layout>
  )
}

export default profile
