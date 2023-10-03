import { useState } from "react"
import { Recipes, Home, Heart } from "../images/images";

const sidebar = () => {

    const [activeTab, setActiveTab] = useState(null);

    const handleClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <aside className="aside">
            <div className="aside-container">
                <h4>Discover</h4>
                <div className={`${activeTab === "home" ? "home-container-active" : "home-container"}`} onClick={() => handleClick("home")}>
                    <img src={Home} alt="home-icon"/>
                    <h6>Home</h6>
                </div>
                <div className={`${activeTab === "favorite" ? "favorite-container-active" : "favorite-container"}`} onClick={() => handleClick("favorite")}>
                    <img src={Heart} alt="favorite-icon"/>
                    <h6>Favorites</h6>
                </div>
                <div className={`${activeTab === "recipes" ? "recipes-container-active" : "recipes-container"}`} onClick={() => handleClick("recipes")}>
                    <img src={Recipes} alt="recipes-icon"/>
                    <h6>All recipes</h6>
                </div>
            </div>
        </aside>
    )
}

export default sidebar
