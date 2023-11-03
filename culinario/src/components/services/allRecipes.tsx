import { useState, useMemo } from "react";
import { useGetRecipesQuery } from "./api/recipesApi";
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

// passing the simplified through props
interface AllRecipesProps {
  simplified: boolean;
}

const AllRecipes: React.FC<AllRecipesProps> = ({ simplified }: AllRecipesProps) => {
  // checking and setting the count by simplified = true/false, on homepage true, on recipes false
  const count = simplified ? 10 : 40;

  // fetching the data from custom query
  const { data: recipesList, isFetching } = useGetRecipesQuery(count);

  // state for the searchTerm in searchBar
  const [searchTerm, setSearchTerm] = useState("");

  // Memoize the filtered data to avoid unnecessary re-renders
  const filteredData = useMemo(() => {
    if (recipesList) {
      return recipesList.results.filter((recipe: Recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return [];
  }, [recipesList, searchTerm]);

  // checking if the API data is fetching
  if (isFetching) return "Loading...";

  return (
    <>
      {/* checking if simplifed is false, if is, search bar will show */}
      {/* TODO: create a custom component for search */}
      {!simplified && (
          <div className="search-recipe">
              <input placeholder="Search recipe, ingredient..." onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
        )
      }

      <div className='recipe-card-container'>
        {filteredData.map((recipe: Recipe) => (
          <div className="recipe-card" key={recipe.id}>
            {/* custom component */}
            <RecipeCard key={recipe.id} recipe={recipe} />
          </div>
        ))}
      </div>
    </>
  )
}

export default AllRecipes;