
// pridat profile component
// po kliknuti zobrazit misto mainBlog, profiůe
// zobrazit accessToken, email, isVerified, isAnon, Created, LastLogged atd atd
import { User } from "firebase/auth";
import { ProfileIcon } from "../images/images";

interface ProfileProps {
  authUser: User | null; 
}

const profile: React.FC<ProfileProps> = ({ authUser } : ProfileProps) => {

  console.log(authUser)  

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



  return (
    <div className="profile-container">
        <h1>Your Profile</h1> 
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
    </div>
  )
}

export default profile
