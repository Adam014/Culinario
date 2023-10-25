import { useState, useMemo } from "react";
import { useGetRecipesQuery } from "./recipesApi";
import { Input } from 'antd';
import { Link } from 'react-router-dom';

import { ThumbsUp, Time } from "../../images/images";

// Define TypeScript interfaces for better type safety
export interface Recipe {
  id: number;
  name: string;
  thumbnail_url: string;
  description: string;
  user_ratings: { count_positive: number };
  total_time_tier: { display_tier: string };
}

interface AllRecipesProps {
  simplified: boolean;
}

const AllRecipes: React.FC<AllRecipesProps> = ({ simplified }: AllRecipesProps) => {
  const count = simplified ? 10 : 40;

  const { data: recipesList, isFetching } = useGetRecipesQuery(count);
  const [searchTerm, setSearchTerm] = useState("");
  
  // TODO: add a favorite button, so it will appear in Favorite.tsx
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  // Memoize the filtered data to avoid unnecessary re-renders
  const filteredData = useMemo(() => {
    if (recipesList) {
      return recipesList.results.filter((recipe: Recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [];
  }, [recipesList, searchTerm]);

  // // Function to add a recipe to favorites
  const toggleFavorites = (recipe: Recipe) => {
    if (favorites.some((favRecipe) => favRecipe.id === recipe.id)) {
      // Recipe is already in favorites, so remove it
      const updatedFavorites = favorites.filter((favRecipe) => favRecipe.id !== recipe.id);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      // Recipe is not in favorites, so add it
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  if (isFetching) return "Loading...";

  // const handleFavorite = () => {
  //   setFavorite(prevstate => !prevstate);
  // }

  // console.log(favorite);

  return (
    <>
      {!simplified && (
        <div className="search-recipe">
          <Input placeholder="Search recipe, ingredient..." onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        )
      }

      <div className='recipe-card-container'>
        {filteredData.map((recipe: Recipe) => (
          <div className="recipe-card" key={recipe.id}>
            <button onClick={() => toggleFavorites(recipe)}>Add to favorites</button>
            <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
              <div className="recipe-info">
                <img className="recipe-image" src={recipe.thumbnail_url} alt={recipe.name} />
                <h2>{recipe.name}</h2>
                <hr />
                <div className="rating">
                  <p className="positive-rating">{recipe.user_ratings.count_positive}</p>
                  <img src={ThumbsUp} alt="thumbs-up"/>
                  <p>{recipe.total_time_tier?.display_tier}</p>
                  {recipe.total_time_tier?.display_tier && <img src={Time} alt="time" />}
                </div>
                <p>{recipe.description}</p>
                <button className="button">Learn</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default AllRecipes;