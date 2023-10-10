import { useNavigate } from "react-router-dom";
import { CulinarioLogo, ProfileIcon, Search } from "../images/images";
import { User } from "firebase/auth";
import { getProfileInfo } from './auth/authUtils';

interface NavbarProps {
  authUser: User | null; 
  toggleProfile: () => void;
}

const navbar = ({ authUser, toggleProfile } : NavbarProps) => {
  const redirect = useNavigate();
  const { imgSrc, name} = getProfileInfo(authUser);

  const handleHome = () => {
    redirect("/")
  }

  console.log(authUser)

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
          {/* cleaner code, saving everything to variables, importing from authUtils */}
          <img src={imgSrc || ProfileIcon} alt="profile-icon" />
          <p>{name}</p>  
        </div>  
    </nav>
  )
}

export default navbar
