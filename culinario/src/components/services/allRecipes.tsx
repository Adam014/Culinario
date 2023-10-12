import { useGetRecipesQuery } from "./recipesApi";

interface AllRecipesProps {
    simplified: Boolean;
  }

const allRecipes : React.FC<AllRecipesProps> = ({ simplified } : AllRecipesProps) => {
    // count variable, if simplified true so 10 recipes, if false 40
    const count = simplified ? 10 : 40;

    // variable for the recipes
    const {data: recipesList, isFetching} = useGetRecipesQuery(count)

    // add custom loader
    if(isFetching) return "Loading..."

    return(
        <div>
            {/* mapping over a recipesList array of objects */}
            {recipesList?.results.map((recipe: { name: string }, index: number) => (
              // add whole block of the single recipe
              <div key={index}>{recipe.name}</div>
            ))}
        </div>
    )
}

export default allRecipes