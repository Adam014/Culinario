import { useState, useMemo } from "react";
import { useGetRecipesQuery } from "./api/recipesApi";
import RecipeCard from './recipeCard';
import { User } from "firebase/auth";

import Search from "../Search";

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
  authUser: User | null
}

const AllRecipes: React.FC<AllRecipesProps> = ({ simplified, authUser }: AllRecipesProps) => {
  // checking and setting the count by simplified = true/false, on homepage true, on recipes false
  const count = simplified ? 10 : 40;

  // state for the searchTerm in searchBar
  const [searchTerm, setSearchTerm] = useState("");

  // fetching the data from custom query
  const { data: recipesList, isFetching } = useGetRecipesQuery(count);

  // Memoize the filtered data to avoid unnecessary re-renders
  const filteredData = useMemo(() => {
    if (recipesList) {
      return recipesList.results.filter((recipe: Recipe) =>
        recipe.name.toLowerCase().includes(searchTerm?.toLowerCase())
      );
    }
    return [];
  }, [recipesList, searchTerm]);
  
  // checking if the API data is fetching
  if (isFetching) return "Loading...";
  return (
    <>
      {/* checking if simplifed is false, if is, search bar will show */}
      {!simplified && (
          <Search setSearchTerm={setSearchTerm}/>
        )
      }

      <div className='recipe-card-container'>
        {filteredData.map((recipe: Recipe) => (
          <div className="recipe-card" key={recipe.id}>
            {/* custom component */}
            <RecipeCard key={recipe.id} recipe={recipe} authUser={authUser}/>
          </div>
        ))}
      </div>
    </>
  )
}

export default AllRecipes;