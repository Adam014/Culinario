import { useGetRecipesQuery } from "./services/recipesApi";

interface AllRecipesProps {
    simplified: Boolean;
  }

const allRecipes : React.FC<AllRecipesProps> = ({ simplified } : AllRecipesProps) => {
    const count = simplified ? 10 : 40;

    const {data: recipesList, isFetching} = useGetRecipesQuery(count)

    // add custom loader
    if(isFetching) return "Loading..."

    // add whole block of the single recipe

    return(
        <div>
            {recipesList?.results.map((recipe: { name: string }, index: number) => (
              <div key={index}>{recipe.name}</div>
            ))}
        </div>
    )
}

export default allRecipes