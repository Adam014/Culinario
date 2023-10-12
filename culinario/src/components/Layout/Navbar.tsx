import { CulinarioLogo, ProfileIcon, Search } from "../../images/images";
import { User } from "firebase/auth";
import { getProfileInfo } from '../auth/authUtils';
import { Link } from "react-router-dom";

// passing throught props and defining its types
interface NavbarProps {
  authUser: User | null;
  handleTabClick: (tabName: string) => void;
}

const navbar = ({ authUser, handleTabClick } : NavbarProps) => {

  // importing imgSrc and name
  const { imgSrc, name} = getProfileInfo(authUser);

  return (
    <nav className="navbar">
        <Link to="/" className="logo-container" onClick={() => handleTabClick("home")}>
          <img src={CulinarioLogo} alt="culinario-navbar-logo"/>
        </Link>

        {/* add a search for a recipe name or ingredient */}
        <div className="search-bar-container">
          <form className="search-box">
            <input type="text" placeholder="Search for a recipe, ingredient..." />
            <button><img src={Search} alt="search-icon" /></button>
          </form>
        </div>  

        <Link to="/profile" className="profile-container" onClick={() => handleTabClick("profile")}>
          {/* cleaner code, saving everything to variables, importing from authUtils */}
          <img src={imgSrc || ProfileIcon} alt="profile-icon" />
          <p>{name}</p>  
        </Link>  
    </nav>
  )
}

export default navbar
