import { User } from "firebase/auth";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

interface HomeDetailsProps {
  authUser: User | null; // Define the type for authUse
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const main: React.FC<HomeDetailsProps> = ({ authUser, setAuthUser } : HomeDetailsProps) => {
  return (
    <div> 
      <Navbar authUser={authUser}/>
      <Sidebar authUser={authUser} setAuthUser={setAuthUser}/>
      <main className="main">
        <div className="welcome-title">
          <h1>Welcome back {authUser?.providerData && authUser?.providerData.length > 0 && authUser?.providerData[0].providerId === "google.com" || "github-com" ? `${authUser?.displayName}` : `${authUser?.email}`}</h1>
          <h2>What are you cooking today?</h2>
        </div>
      </main>
    </div>
  )
}

export default main
