import React, { useState } from 'react';
import { Recipe } from './allRecipes'; 
import { ThumbsUp, Time } from '../../images/images'; 
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  recipe: Recipe;
}

// save the favorite to db instead of localStorage

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }: RecipeCardProps) => {
  // state for the array of favorites, loading from localStorage
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // function for toggling the recipes into Favorite mode
  const toggleFavorites = (recipe: Recipe) => {
    // Create a timestamp
    const timestamp = new Date().getTime();
    const updatedRecipe = { ...recipe, favoritedAt: timestamp }; // Add favoritedAt property

    if (favorites.some((favRecipe) => favRecipe.id === recipe.id)) {
      // Recipe is already in favorites, so remove it
      const updatedFavorites = favorites.filter((favRecipe) => favRecipe.id !== recipe.id);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Recipe is not in favorites, so add it with the timestamp
      const updatedFavorites = [...favorites, updatedRecipe];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  return (
    <div className='recipe-card'>
      <button onClick={() => toggleFavorites(recipe)} className='button-favorite'>
          {favorites.some((favRecipe) => favRecipe.id === recipe.id)
            ? <i className="fa-solid fa-heart remove-favorite"></i>
            : <i className="fa-regular fa-heart add-favorite"></i>
          }
      </button>
      <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
        <div className="recipe-info">
          <img className="recipe-image" src={recipe.thumbnail_url} alt={recipe.name} />
          <h2>{recipe.name}</h2>
          {/* <hr /> */}
          <div className="rating">
            <p className="positive-rating">{recipe.user_ratings.count_positive}</p>
            <img src={ThumbsUp} alt="thumbs-up" />
            <p>{recipe.total_time_tier?.display_tier}</p>
            {recipe.total_time_tier?.display_tier && <img src={Time} alt="time" />}
          </div>
          <p>{recipe.description}</p>
          <button className="button">Learn</button>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
