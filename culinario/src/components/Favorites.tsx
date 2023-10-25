import Layout from "./Layout/Layout"
import { User } from "firebase/auth";
import { Recipe } from "./services/allRecipes"; 
import RecipeCard from './services/recipeCard';

// passing throught props and defining its types
interface FavoritesProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Favorites: React.FC<FavoritesProps> = ({authUser, setAuthUser} : FavoritesProps) => {
  // getting the favorites from the localStorage and then saving it into var.
  const storedFavorites = localStorage.getItem("favorites");
  const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  // console.log(favorites);

  // Sort favorites by the 'favoritedAt' timestamp in descending order
  const sortedFavorites = [...favorites]
    .filter(recipe => typeof recipe.favoritedAt === 'number')
    .sort((a, b) => b.favoritedAt - a.favoritedAt);

  return (
    <Layout authUser={authUser} setAuthUser={setAuthUser}>
      <main className="main">
        <h1>Your Favorites Recipes</h1>
        <div className='recipe-card-container'>
          {sortedFavorites?.map((recipe: Recipe) => (
            // custom component
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
    </Layout>
  )
}

export default Favorites
