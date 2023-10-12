import Layout from "./Layout/Layout";
import { User } from "firebase/auth";
import { useGetRecipesQuery } from "./services/recipesApi";


interface RecipesProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Recipes: React.FC<RecipesProps> = ({ authUser, setAuthUser } : RecipesProps) => {
  const {data, isFetching} = useGetRecipesQuery(40);

  console.log(data?.results[0]?.name)
  // console.log(isFetching)

  if(isFetching) return 'Loading...';

  return (
    <Layout authUser={authUser} setAuthUser={setAuthUser}>
        <main className="main">
            <h1>Your Recipes</h1>
            {data?.results.map((recipe: { name: string }, index: number) => (
              <div key={index}>{recipe.name}</div>
            ))}
        </main>
    </Layout>
  )
}

export default Recipes
