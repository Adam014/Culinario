import { useState, useEffect } from "react"
import { User } from "firebase/auth";
import { ProfileIcon } from "../images/images";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout/Layout";
import { getProfileInfo } from './auth/authUtils';

// passing throught props and defining its types
interface ProfileProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const profile: React.FC<ProfileProps> = ({ authUser , setAuthUser } : ProfileProps) => {
  // setting the variable for redirecting
  const redirect = useNavigate();  

  // setting the state for loading the data, if it is loading, loading will show
  const [loading, setLoading] = useState(true); 

  // importing the user image
  const { imgSrc } = getProfileInfo(authUser);

  // using the loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // formatting the user lastlogged and accountcreated time for Czech time
  const createdAt = authUser?.metadata?.creationTime
    ? new Date(authUser?.metadata?.creationTime).toLocaleString("cz-CZ", {
        timeZone: "Europe/Prague", 
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
    : "N/A";

  const lastSignInTime = authUser?.metadata?.lastSignInTime
    ? new Date(authUser?.metadata?.lastSignInTime).toLocaleString("cz-CZ", {
        timeZone: "Europe/Prague", 
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
    : "N/A";

  // function for resetting the password
  const handleReset = () => {
      redirect("/reset-password")
  }  

  return (
     <Layout authUser={authUser} setAuthUser={setAuthUser} >
        <main className="main">
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
              <h4 onClick={handleReset}>Reset your password here</h4>
            </div>
            <div className="default-user-info">

              {/* cleaner code, saving everything to variables */}
              <img src={imgSrc || ProfileIcon} alt="profile-picture" />

              <div className="title-user-info">
                {authUser?.displayName && <h2>{authUser?.providerData && authUser?.providerData.length > 0 && authUser?.providerData[0].providerId === "google.com" || "github-com" ? `${authUser?.displayName}` : `${authUser?.email}`}</h2>}
                <p>Account created at: {createdAt}</p>
                <p>Email: {authUser?.email}</p>
                <p>uid: {authUser?.uid}</p>
                <p>Provider: {authUser?.providerData[0].providerId}</p>
              </div>
            </div>
            <h3>Last login: {lastSignInTime}</h3>
          </>
        )}
        </main>
      </Layout>
  )
}

export default profile
