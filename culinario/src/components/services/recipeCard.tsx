import React from 'react';
import { Recipe } from './allRecipes'; // Adjust the import path as needed
import { ThumbsUp, Time } from '../../images/images'; // Adjust the import path as needed
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }: RecipeCardProps) => {
  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
        <div className="recipe-info">
          <img className="recipe-image" src={recipe.thumbnail_url} alt={recipe.name} />
          <h2>{recipe.name}</h2>
          <hr />
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
