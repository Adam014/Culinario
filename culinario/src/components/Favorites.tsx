import Layout from "./Layout/Layout"
import { User } from "firebase/auth";
import { Recipe } from "./services/allRecipes"; 

// passing throught props and defining its types
interface FavoritesProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Favorites: React.FC<FavoritesProps> = ({authUser, setAuthUser} : FavoritesProps) => {
  const storedFavorites = localStorage.getItem("favorites");
  const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  console.log(favorites);

  return (
    <Layout authUser={authUser} setAuthUser={setAuthUser}>
      <main className="main">
        <h1>Your Favorites Recipes</h1>
        <ul>
          {favorites?.map((recipe: Recipe) => (
            <li key={recipe.id}>
              <h2>{recipe.name}</h2>
              {/* Render other details of the favorite recipe here */}
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  )
}

export default Favorites
