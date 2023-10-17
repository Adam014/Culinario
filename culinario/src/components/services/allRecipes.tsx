import { useState, useEffect } from "react";
import { useGetRecipesQuery } from "./recipesApi";

interface AllRecipesProps {
    simplified: Boolean;
  }

const allRecipes : React.FC<AllRecipesProps> = ({ simplified } : AllRecipesProps) => {
    // count variable, if simplified true so 10 recipes, if false 40
    const count = simplified ? 1 : 40;

    // variable for the recipes
    const {data: recipesList, isFetching} = useGetRecipesQuery(count);
    // add custom card skeleton
    if(isFetching) return "Loading...";

    return(
        <div>

        </div>
    )
}

export default allRecipes