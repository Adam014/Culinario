import { User } from "firebase/auth";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Main from "./main";

interface HomeDetailsProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const homePage: React.FC<HomeDetailsProps> = ({ authUser, setAuthUser } : HomeDetailsProps) => {
  return (
    <div className={authUser ? "recipes-page-container" : "container"}>
      <Navbar authUser={authUser}/>
      <Sidebar authUser={authUser} setAuthUser={setAuthUser}/>
      <Main authUser={authUser}/>
    </div>
  )
}

export default homePage
