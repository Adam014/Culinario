import Layout from "./Layout/Layout";
import { User } from "firebase/auth";
import AllRecipes from "./services/allRecipes";

// passing throught props and defining its types
interface RecipesProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Recipes: React.FC<RecipesProps> = ({ authUser, setAuthUser } : RecipesProps) => {

  return (
    <Layout authUser={authUser} setAuthUser={setAuthUser}>
        <main className="main">
            <h1>All Recipes</h1>
            <AllRecipes simplified={false} />
        </main>
    </Layout>
  )
}

export default Recipes
