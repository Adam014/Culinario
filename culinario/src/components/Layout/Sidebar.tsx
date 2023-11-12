import { useEffect } from "react"
import { Recipes, Home, Heart } from "../../images/images";
import { auth } from "../../firebase/firebase";
import { User, signOut } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom";

// passing throught props and defining its types
interface SidebarProps {
    authUser: User | null; 
    setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
    setActiveTab: (tabName: string) => void;
    activeTab: string;
    handleTabClick: (tabName: string) => void;
    visible: boolean;
}
  
const sidebar: React.FC<SidebarProps> = ({ setAuthUser, setActiveTab, activeTab, handleTabClick, visible } : SidebarProps) => {
    const redirect = useNavigate();

    // getting from localStorage the activeTab
    useEffect(() => {
      const savedTab = localStorage.getItem('activeTab');
      // console.log('Saved tab:', savedTab);
      // setting the activeTab to state
      if (savedTab) {
        setActiveTab(savedTab);
        // console.log('Setting active tab to savedTab');
      }
    }, [setActiveTab]);

    // function for user to signout
    const userSignOut = () => {
        signOut(auth)
        .then(() => {
            console.log("Successfully signed out!")
            setAuthUser(null);
            redirect("/");
        })
        .catch((error) => console.log(error))
    }

    return (
    <aside className={`aside ${visible ? "visible" : ""}`}>
      <div className="aside-container">
        <h4>Discover</h4> 
        {/* Link to homePage */}
        <Link to="/" className={`home-container ${activeTab === "home" ? "active" : ""}`} onClick={() => handleTabClick("home")}>
          <img src={Home} alt="home-icon" />
          <h6>Home</h6>
        </Link>
        {/* Link to Favorites */}
        <Link to="/favorites" className={`favorite-container ${activeTab === "favorites" ? "active" : ""}`} onClick={() => handleTabClick("favorites")}>
          <img src={Heart} alt="favorite-icon" />
          <h6>Favorites</h6>
        </Link>
        {/* Link to All the Recipes */}
        <Link to="/recipes" className={`recipes-container ${activeTab === "recipes" ? "active" : "" }`} onClick={() => handleTabClick("recipes")}>
          <img src={Recipes} alt="recipes-icon" />
          <h6>All recipes</h6>
        </Link>
        <div className="button-container">
          {/* button for logout */}
          <button onClick={userSignOut}>Logout</button>
        </div>
      </div>
    </aside>
  );
}

export default sidebar
