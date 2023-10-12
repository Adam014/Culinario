import { useGetRecipesQuery } from "./services/recipesApi";

interface AllRecipesProps {
    simplified: Boolean;
  }

const allRecipes : React.FC<AllRecipesProps> = ({ simplified } : AllRecipesProps) => {
    const count = simplified ? 10 : 40;

    const {data: recipesList, isFetching} = useGetRecipesQuery(count)

    console.log(count)
    if(isFetching) return "Loading..."

    return(
        <div>
            {recipesList?.results.map((recipe: { name: string }, index: number) => (
              <div key={index}>{recipe.name}</div>
            ))}
        </div>
    )
}

export default allRecipes