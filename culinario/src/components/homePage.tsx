import { User } from "firebase/auth";
// import Profile from "./Profile";
import Layout from "./Layout/Layout";
import { getProfileInfo } from './auth/authUtils';

import { useGetRecipesQuery } from "./services/recipesApi";
import { Link } from "react-router-dom";
import AllRecipes from "./allRecipes";

interface HomeDetailsProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const homePage: React.FC<HomeDetailsProps> = ({ authUser, setAuthUser } : HomeDetailsProps) => {

  const { name } = getProfileInfo(authUser);

  const {data, isFetching} = useGetRecipesQuery(40);

  console.log(data?.results)
  // console.log(isFetching)

  // add custom loader
  if(isFetching) return 'Loading...';

  return (
    <Layout authUser={authUser} setAuthUser={setAuthUser} >
      <main className="main">
        <div className="welcome-title">
          {/* cleaner code, saving everything to variables, importing from authUtils */}
          <h1>Welcome back, {name}</h1>
          <h3>What are you cooking today?</h3>
          <h4><Link to="/recipes">Show more</Link></h4>
          <AllRecipes simplified={true} />
        </div>
      </main>
    </Layout>
  )
}

export default homePage
