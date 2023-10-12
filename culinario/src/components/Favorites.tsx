import Layout from "./Layout/Layout"
import { User } from "firebase/auth";

// passing throught props and defining its types
interface FavoritesProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Favorites: React.FC<FavoritesProps> = ({authUser, setAuthUser} : FavoritesProps) => {
  return (
    // component for showing the favorite recipes
    <Layout authUser={authUser} setAuthUser={setAuthUser}>
        <main className="main">
            <h1>Your Favorites Recepies</h1>
        </main> 
    </Layout>
  )
}

export default Favorites
