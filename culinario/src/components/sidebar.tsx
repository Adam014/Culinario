import { useState } from "react"
import { Recipes, Home, Heart } from "../images/images";
import { auth } from "../firebase/firebase";
import { User, signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom";

interface SidebarProps {
    authUser: User | null; // Define the type for authUser
    setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}
  
const sidebar: React.FC<SidebarProps> = ({ setAuthUser } : SidebarProps) => {
    const redirect = useNavigate();
    const [activeTab, setActiveTab] = useState<string>("home");

    const userSignOut = () => {
        signOut(auth)
        .then(() => {
            console.log("Successfully signed out!")
            setAuthUser(null)
            redirect("/")
        })
        .catch((error) => console.log(error))
    }

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        switch (tab) {
        case "home":
            redirect("/");
            break;
        case "favorites":
            redirect("/favorite");
            break;
        case "recipes":
            redirect("/recipes");
            break;
        default:
            redirect("/");
            break;
        }
    }

    return (
        <aside className="aside">
            <div className="aside-container">
                <h4>Discover</h4>
                <div
                className={`home-container ${activeTab === "home" ? "active" : ""}`}
                onClick={() => handleTabClick("home")}
                >
                    <img src={Home} alt="home-icon" />
                    <h6>Home</h6>
                </div>
                <div
                className={`favorite-container ${
                    activeTab === "favorites" ? "active" : ""
                }`}
                onClick={() => handleTabClick("favorites")}
                >
                    <img src={Heart} alt="favorite-icon" />
                    <h6>Favorites</h6>
                </div>
                <div
                className={`recipes-container ${
                    activeTab === "recipes" ? "active" : ""
                }`}
                onClick={() => handleTabClick("recipes")}
                >
                    <img src={Recipes} alt="recipes-icon" />
                    <h6>All recipes</h6>
                </div>
                <div className="button-container">
                    <button onClick={userSignOut}>Logout</button>
                </div>
            </div>
        </aside>
    );
}

export default sidebar
