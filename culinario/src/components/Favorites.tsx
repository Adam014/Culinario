import Layout from "./Layout/Layout";
import { User } from "firebase/auth";
import RecipeCard from './services/recipeCard';
import { getFavoriteRecipesData } from '../utils/db';

// Define the props interface
interface FavoritesProps {
  authUser: User | null;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Favorites: React.FC<FavoritesProps> = ({ authUser, setAuthUser }: FavoritesProps) => {
  // Get the favorite recipes data
  const favorites = getFavoriteRecipesData();
  // console.log(favorites)

  return (
    <Layout authUser={authUser} setAuthUser={setAuthUser}>
      <main className="main">
        <h1>Your Favorite Recipes</h1>
        <div className='recipe-card-container'>
          {favorites.map((favoriteRecipe) => (
            <RecipeCard key={favoriteRecipe.id} recipe={favoriteRecipe.recipe} authUser={authUser}/>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Favorites;
