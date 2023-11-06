import { User } from "firebase/auth";
import Layout from "./Layout/Layout";
import { getProfileInfo } from './auth/authUtils';

import { useGetRecipesQuery } from "./services/api/recipesApi";
import { Link } from "react-router-dom";
import AllRecipes from "./services/allRecipes";

// passing throught props and defining its types
interface HomeDetailsProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const homePage: React.FC<HomeDetailsProps> = ({ authUser, setAuthUser } : HomeDetailsProps) => {

  // importing the user name
  const { name } = getProfileInfo(authUser);

  // setting the state for data that is passed from the API
  const {isFetching} = useGetRecipesQuery(10);
  // console.log(data?.results)
  // console.log(isFetching)

  // add custom loader
  if(isFetching) return <div className="loader-container">
                          <div className="loader">
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                            <div className="circle"></div>
                          </div>
                        </div>

  return (
    <Layout authUser={authUser} setAuthUser={setAuthUser} >
      <main className="main">
        {/* TODO: add a sidebar showing button */}
        {/* <button className="showing-sidebar-btn" style={{display: 'none'}}>Show sidebar</button> */}
        <div className="welcome-title">
          {/* cleaner code, saving everything to variables, importing from authUtils */}
          <h1>Welcome back, {name}</h1>
          <h3>What are you cooking today?</h3>
          <h4 className="show-more-link"><Link to="/recipes">Show more</Link></h4>
          <AllRecipes simplified={true} authUser={authUser}/>
        </div>
      </main>
    </Layout>
  )
}

export default homePage
