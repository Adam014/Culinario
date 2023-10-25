import { useState, useMemo } from "react";
import { useGetRecipesQuery } from "./recipesApi";
import { Input } from 'antd';
import RecipeCard from './recipeCard';

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
  
  // state for the array of favorites, loading from localStorage
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

  // checking if the API data is fetching
  if (isFetching) return "Loading...";

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
            <button onClick={() => toggleFavorites(recipe)}>
              {favorites.some((favRecipe) => favRecipe.id === recipe.id)
                ? "Remove from favorites"
                : "Add to favorites"
              }
            </button>
            <RecipeCard key={recipe.id} recipe={recipe} />
          </div>
        ))}
      </div>
    </>
  )
}

export default AllRecipes;