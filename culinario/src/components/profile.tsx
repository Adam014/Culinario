import { User } from "firebase/auth";
import { ProfileIcon } from "../images/images";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

interface ProfileProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
  toggleProfile: () => void;
}

const profile: React.FC<ProfileProps> = ({ authUser , setAuthUser, toggleProfile } : ProfileProps) => {

  const redirect = useNavigate();  

  const createdAt = authUser?.metadata?.creationTime
    ? new Date(authUser?.metadata?.creationTime).toLocaleString("cz-CZ", {
        timeZone: "Europe/Prague", // Change to the desired European timezone
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
        timeZone: "Europe/Prague", // Change to the desired European timezone
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })
    : "N/A";

  const handleReset = () => {
      redirect("/reset-password")
  }  

  // console.log(authUser)


  // need to fix
  // when page is reloaded the props doesnt show

  return (
     <Layout authUser={authUser} setAuthUser={setAuthUser} toggleProfile={toggleProfile}>
        <main className="main">
            <div className="title-text">      
              <h1>Your Profile</h1> 
              <h4 onClick={handleReset}>Reset your password here</h4>
            </div>
            <div className="default-user-info"> 
              {authUser?.providerData && authUser?.providerData.length > 0 && authUser?.providerData[0].providerId === "google.com" || "github-com" ? <img src={authUser?.photoURL!} alt={authUser?.photoURL || "profile-user-icon"} /> : <img src={ProfileIcon} alt="profile-user-icon"/>}
              <div className="title-user-info">
                <h2>{authUser?.providerData && authUser?.providerData.length > 0 && authUser?.providerData[0].providerId === "google.com" || "github-com" ? `${authUser?.displayName}` : `${authUser?.email}`}</h2>  
                <p>Account created at: {createdAt}</p> 
                <p>Email: {authUser?.email}</p>
                <p>uid: {authUser?.uid}</p>
                <p>Provider: {authUser?.providerData[0].providerId}</p>
              </div>
            </div>
            <h3>Last login: {lastSignInTime}</h3>
        </main>
      </Layout>
  )
}

export default profile
