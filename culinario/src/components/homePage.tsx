import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import Profile from "./Profile";
import Layout from "./Layout";
import { getProfileInfo } from './auth/authUtils';

interface HomeDetailsProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const homePage: React.FC<HomeDetailsProps> = ({ authUser, setAuthUser } : HomeDetailsProps) => {

  const { name } = getProfileInfo(authUser);

  return (
    <Layout authUser={authUser} setAuthUser={setAuthUser} >
      <main className="main">
        <div className="welcome-title">
          {/* cleaner code, saving everything to variables, importing from authUtils */}
          <h1>Welcome back, {name}</h1>
          <h3>What are you cooking today?</h3>
        </div>
    </main>
    </Layout>
  )
}

export default homePage
