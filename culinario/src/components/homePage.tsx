import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import Profile from "./Profile";
import Layout from "./Layout";

interface HomeDetailsProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const homePage: React.FC<HomeDetailsProps> = ({ authUser, setAuthUser } : HomeDetailsProps) => {

  const redirect = useNavigate();

  const toggleProfile = () => {
    redirect("/profile")
  };

  return (
    <Layout authUser={authUser} setAuthUser={setAuthUser} toggleProfile={toggleProfile}>
      <main className="main">
        <div className="welcome-title">
          <h1>Welcome back {authUser?.providerData && authUser?.providerData.length > 0 && authUser?.providerData[0].providerId === "google.com" || "github-com" ? `${authUser?.displayName}` : `${authUser?.email}`}</h1>
          <h3>What are you cooking today?</h3>
        </div>
    </main>
    </Layout>
  )
}

export default homePage
