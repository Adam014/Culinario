import { useState, useEffect } from "react";
import { useGetRecipesQuery } from "./recipesApi";
import { Input } from 'antd';
import { Link } from 'react-router-dom';

import { ThumbsUp } from "../../images/images";

interface AllRecipesProps {
  simplified: boolean;
}

const AllRecipes: React.FC<AllRecipesProps> = ({ simplified }: AllRecipesProps) => {
  // count variable, if simplified true so 10 recipes, if false 40
  const count = simplified ? 10 : 40;

  // variable for the recipes
  const { data: recipesList, isFetching } = useGetRecipesQuery(count);

  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Update the recipes when the query data or search term changes.
  useEffect(() => {
    if (recipesList) {
      const filteredData = recipesList.results.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setRecipes(filteredData);
    }
  }, [recipesList, searchTerm]);

  // add custom card skeleton
  if (isFetching) return "Loading...";

  return (
    <>
      {!simplified &&
        <div className="search-recipe">
          <Input placeholder="Search recipe, ingredient..." onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
      }

      <div className='recipe-card-container'>
        {recipes?.map((recipe: { name: string, id: number, thumbnail_url: string, description: string }) => (
          <div className="recipe-card" key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`} key={recipe.id}>
              <div className="recipe-info">
                <img className="recipe-image" src={recipe.thumbnail_url} alt={recipe.name} />
                <h2>{recipe.name}</h2>
                <div className="rating">
                  
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