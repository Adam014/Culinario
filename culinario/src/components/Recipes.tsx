import Layout from "./Layout/Layout"
import { User } from "firebase/auth";

interface RecipesProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Recipes: React.FC<RecipesProps> = ({ authUser, setAuthUser } : RecipesProps) => {
  return (
    <Layout authUser={authUser} setAuthUser={setAuthUser}>
        <main className="main">
            <h1>Your Recipes</h1>
        </main>
    </Layout>
  )
}

export default Recipes
