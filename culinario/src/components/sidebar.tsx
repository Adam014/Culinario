import { Recipes, Home, Heart } from "../images/images"

const sidebar = () => {
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
        </div>
    </aside>
  )
}

export default sidebar
