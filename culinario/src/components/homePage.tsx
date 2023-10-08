import { User } from "firebase/auth";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react"; 
import Profile from "./Profile";
import Main from "./Main";

interface HomeDetailsProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const homePage: React.FC<HomeDetailsProps> = ({ authUser, setAuthUser } : HomeDetailsProps) => {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <div className={authUser ? "recipes-page-container" : "container"}>
      <Navbar authUser={authUser} toggleProfile={toggleProfile}/>
      <Sidebar authUser={authUser} setAuthUser={setAuthUser}/>
       {showProfile ? <Profile authUser={authUser}/> : <Main authUser={authUser} />} 
    </div>
  )
}

export default homePage
