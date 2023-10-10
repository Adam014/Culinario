import { CulinarioLogo, ProfileIcon, Search } from "../../images/images";
import { User } from "firebase/auth";
import { getProfileInfo } from '../auth/authUtils';
import { Link } from "react-router-dom";

interface NavbarProps {
  authUser: User | null; 
  setActiveTab: (tabName : string) => void;
}

const navbar = ({ authUser, setActiveTab } : NavbarProps) => {
  const { imgSrc, name} = getProfileInfo(authUser);

  const handleClickProfile = () => {
    setActiveTab("profile");
  }

  return (
    <nav className="navbar">
        <Link to="/" className="logo-container">
          <img src={CulinarioLogo} alt="culinario-navbar-logo"/>
        </Link>
        <div className="search-bar-container">
          <form className="search-box">
            <input type="text" placeholder="Search for a recipe, ingredient..." />
            <button><img src={Search} alt="search-icon" /></button>
          </form>
        </div>  
        <Link to="/profile" className="profile-container" onClick={handleClickProfile}>
          {/* cleaner code, saving everything to variables, importing from authUtils */}
          <img src={imgSrc || ProfileIcon} alt="profile-icon" />
          <p>{name}</p>  
        </Link>  
    </nav>
  )
}

export default navbar
