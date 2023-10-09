import { useNavigate } from "react-router-dom";
import { CulinarioLogo, ProfileIcon, Search } from "../images/images";
import { User } from "firebase/auth";

interface NavbarProps {
  authUser: User | null; 
  toggleProfile: () => void;
}

const navbar = ({ authUser, toggleProfile } : NavbarProps) => {
  const redirect = useNavigate();

  const handleHome = () => {
    redirect("/")
  }
  return (
    <nav className="navbar">
        <div className="logo-container" onClick={handleHome}>
          <img src={CulinarioLogo} alt="culinario-navbar-logo"/>
        </div>
        <div className="search-bar-container">
          <form className="search-box">
            <input type="text" placeholder="Search for a recipe, ingredient..." />
            <button><img src={Search} alt="search-icon" /></button>
          </form>
        </div>  
        <div className="profile-container" onClick={toggleProfile}>
          {authUser?.providerData && authUser?.providerData.length > 0 && authUser?.providerData[0].providerId === "google.com" || "github-com" ? <img src={authUser?.photoURL!} alt={authUser?.photoURL || "profile-user-icon"} /> : <img src={ProfileIcon} alt="profile-user-icon"/>}
          <p>{authUser?.providerData && authUser?.providerData.length > 0 && authUser?.providerData[0].providerId === "google.com" || "github-com" ? `${authUser?.displayName}` : `${authUser?.email}`}</p>  
        </div>  
    </nav>
  )
}

export default navbar
