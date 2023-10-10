import Layout from "./Layout/Layout"
import { User } from "firebase/auth";

interface FavoritesProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Favorites: React.FC<FavoritesProps> = ({authUser, setAuthUser} : FavoritesProps) => {
  return (
    <Layout authUser={authUser} setAuthUser={setAuthUser}>
        <main className="main">
            <h1>Your Favorites Recepies</h1>
        </main> 
    </Layout>
  )
}

export default Favorites
