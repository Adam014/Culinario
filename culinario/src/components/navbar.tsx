import { CulinarioLogo, ProfileIcon, Search } from "../images/images";
import { User } from "firebase/auth"

interface NavbarProps {
  authUser: User | null; // Define the type for authUser
}

const navbar = ({ authUser } : NavbarProps) => {

  console.log(authUser)
  console.log(authUser?.providerData)
  return (
    <nav className="navbar">
        <img src={CulinarioLogo} alt="culinario-navbar-logo"/>
        <div className="search-bar-container">
          <form className="search-box">
            <input type="text" placeholder="Search for a recipe, ingredient..." />
            <button><img src={Search} alt="search-icon" /></button>
          </form>
        </div>  
        <div className="profile-container">
          {authUser?.providerData && authUser?.providerData.length > 0 && authUser?.providerData[0].providerId === "google.com" ? <img src={authUser?.photoURL} alt="profile-user-icon"/> : <img src={ProfileIcon} alt="profile-user-icon"/>}
          <p>{authUser?.email}</p>  
        </div>  
    </nav>
  )
}

export default navbar
