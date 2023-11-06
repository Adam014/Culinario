import React, { useState, useEffect } from 'react';
import { Recipe } from './allRecipes';
import { ThumbsUp, Time } from '../../images/images';
import { Link } from 'react-router-dom';
import { 
  deleteDoc, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  getDoc, 
  setDoc, 
  collection, 
  doc } 
from 'firebase/firestore';
import { favoriteRecipesCollection } from '../../firebase/firebase';
import { User } from 'firebase/auth';

interface RecipeCardProps {
  recipe: Recipe;
  authUser: User | null;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, authUser }: RecipeCardProps) => {

  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(undefined);

  const checkIfFavorite = async () => {
    const q = query(favoriteRecipesCollection, where("recipe.id", "==", recipe.id));
    const querySnapshot = await getDocs(q);
    setIsFavorite(!querySnapshot.empty);
  };

  const toggleFavorite = async () => {
    if (!authUser) {
      // User is not authenticated, handle this case (e.g., show a message)
      return;
    }

    const userUid = authUser.uid;

    const userFavoritesCollection = collection(favoriteRecipesCollection, userUid, 'favoriteRecipes');

    const q = query(
      userFavoritesCollection,
      where("recipe.id", "==", recipe.id)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // The recipe is already a favorite, so remove it
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
      setIsFavorite(false);
    } else {
      // Check if the user's collection exists and create it if it doesn't
      const userDocRef = doc(favoriteRecipesCollection, userUid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        // Create the user's collection if it doesn't exist
        await setDoc(userDocRef, {});
      }

      // Add the recipe to favorites for the current user
      await addDoc(userFavoritesCollection, {
        recipe: recipe, // Save the entire recipe
        favoritedAt: new Date().getTime(),
      });
      setIsFavorite(true);
    }
  };

  useEffect(() => {
    checkIfFavorite(); // Check if the recipe is a favorite when the component mounts
  }, []); // The empty dependency array ensures this effect only runs once

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
