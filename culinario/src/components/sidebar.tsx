import { Recipes, Home, Heart } from "../images/images";
import { auth } from "../firebase/firebase";
import { User, signOut } from "firebase/auth"

interface SidebarProps {
    authUser: User | null; // Define the type for authUser
    setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
  }
  
const sidebar: React.FC<SidebarProps> = ({ authUser, setAuthUser } : SidebarProps) => {
    const userSignOut = () => {
        signOut(auth)
        .then(() => {
            console.log("Successfully signed out!")
            setAuthUser(null)
        })
        .catch((error) => console.log(error))
    }

    console.log(authUser)

    return (
        <aside className="aside">
            <div className="aside-container">
                <h4>Discover</h4>
                <div className="home-container">
                    <img src={Home} alt="home-icon"/>
                    <h6>Home</h6>
                </div>
                <div className="favorite-container">
                    <img src={Heart} alt="favorite-icon"/>
                    <h6>Favorites</h6>
                </div>
                <div className="recipes-container">
                    <img src={Recipes} alt="recipes-icon"/>
                    <h6>All recipes</h6>
                </div>
                <div className="button-container">
                    <button onClick={userSignOut}>Logout</button>
                </div>
            </div>
        </aside>
    )
}

export default sidebar
