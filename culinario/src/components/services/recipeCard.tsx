import React, { useState, useEffect } from 'react';
import { Recipe } from './allRecipes';
import { ThumbsUp, Time } from '../../images/images';
import { Link } from 'react-router-dom';
import { deleteDoc, addDoc, query, where, getDocs } from 'firebase/firestore';
import { favoriteRecipesCollection } from '../../firebase/firebase';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }: RecipeCardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(undefined);

  const checkIfFavorite = async () => {
    const q = query(favoriteRecipesCollection, where("recipeId", "==", recipe.id));
    const querySnapshot = await getDocs(q);
    setIsFavorite(!querySnapshot.empty);
  };

  const toggleFavorite = async () => {
    if (isFavorite) {
      // Remove the recipe from favorites
      const q = query(favoriteRecipesCollection, where("recipeId", "==", recipe.id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      setIsFavorite(false);
    } else {
      // Add the recipe to favorites
      const docRef = await addDoc(favoriteRecipesCollection, {
        recipeId: recipe.id,
        name: recipe.name,
        favoritedAt: new Date().getTime(),
      });
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    checkIfFavorite();
  }, []);

  return (
    <div className='recipe-card'>
      <button onClick={toggleFavorite} className='button-favorite'>
        {isFavorite === undefined ? (
          // Loading state
          <i className='fas fa-spinner fa-spin'></i>
        ) : isFavorite ? (
          // Recipe is a favorite, show the filled heart
          <i className='fa-solid fa-heart'></i>
        ) : (
          // Recipe is not a favorite, show the outlined heart
          <i className='fa-regular fa-heart'></i>
        )}
      </button>
      <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
        <div className='recipe-info'>
          <img className='recipe-image' src={recipe.thumbnail_url} alt={recipe.name} />
          <h2>{recipe.name}</h2>
          <div className='rating'>
            <p className='positive-rating'>{recipe.user_ratings.count_positive}</p>
            <img src={ThumbsUp} alt='thumbs-up' />
            <p>{recipe.total_time_tier?.display_tier}</p>
            {recipe.total_time_tier?.display_tier && <img src={Time} alt='time' />}
          </div>
          <p>{recipe.description}</p>
          <button className='button'>Learn</button>
        </div>
      </Link>
    </div>
  );
};

export default RecipeCard;
