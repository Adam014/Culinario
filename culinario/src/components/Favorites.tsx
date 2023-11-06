import React, { useState } from "react";
import Layout from "./Layout/Layout";
import { User } from "firebase/auth";
import RecipeCard from './services/recipeCard';
import { getFavoriteRecipesData, FavoriteRecipe } from '../utils/db';

// Define the props interface
interface FavoritesProps {
  authUser: User | null;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Favorites: React.FC<FavoritesProps> = ({ authUser, setAuthUser }: FavoritesProps) => {
  // Get the favorite recipes data
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);

  const userUid = authUser?.uid || null;

  const fetchFavoriteRecipes = async () => {
    const favoritesArray = await getFavoriteRecipesData(userUid);
    setFavorites(favoritesArray);
  };

  console.log(favorites)

  fetchFavoriteRecipes();

  return (
    <Layout authUser={authUser} setAuthUser={setAuthUser}>
      <main className="main">
        <h1>Your Favorite Recipes</h1>
        <div className='recipe-card-container'>
          {/* mapping here */}
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe.recipe} authUser={authUser}/>
          ))}
        </div>
      </main>
    </Layout>
  );
};

export default Favorites;