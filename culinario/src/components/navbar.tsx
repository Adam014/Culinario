import { CulinarioLogo, ProfileIcon, Search } from "../images/images";
import { User } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  authUser: User | null; // Define the type for authUser
  setShowProfile: (show: boolean) => void;
}

const navbar = ({ authUser, setShowProfile } : NavbarProps) => {

  const redirect = useNavigate(); // Initialize useNavigate

  const handleProfileClick = () => {
    setShowProfile(true);
    redirect("/profile")
  };

  return (
    <nav className="navbar">
        <img src={CulinarioLogo} alt="culinario-navbar-logo"/>
        <div className="search-bar-container">
          <form className="search-box">
            <input type="text" placeholder="Search for a recipe, ingredient..." />
            <button><img src={Search} alt="search-icon" /></button>
          </form>
        </div>  
        <div className="profile-container" onClick={handleProfileClick}>
          {authUser?.providerData && authUser?.providerData.length > 0 && authUser?.providerData[0].providerId === "google.com" || "github-com" ? <img src={authUser?.photoURL!} alt={authUser?.photoURL || "profile-user-icon"} /> : <img src={ProfileIcon} alt="profile-user-icon"/>}
          <p>{authUser?.providerData && authUser?.providerData.length > 0 && authUser?.providerData[0].providerId === "google.com" || "github-com" ? `${authUser?.displayName}` : `${authUser?.email}`}</p>  
        </div>  
    </nav>
  )
}

export default navbar
