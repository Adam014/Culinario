import { User } from "firebase/auth";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react"; 
import Profile from "./Profile";
import Main from "./Main";
import { Link } from "react-router-dom";

interface HomeDetailsProps {
  authUser: User | null; 
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const homePage: React.FC<HomeDetailsProps> = ({ authUser, setAuthUser } : HomeDetailsProps) => {
   const [showProfile, setShowProfile] = useState(false); // Initialize showProfile state

  return (
    <div className={authUser ? "recipes-page-container" : "container"}>
      <Navbar authUser={authUser} setShowProfile={setShowProfile}/>
      <Link to="/homepage/profile">DAWD</Link>
      <Sidebar authUser={authUser} setAuthUser={setAuthUser}/>
       {showProfile ? <Profile /> : <Main authUser={authUser} />} 
    </div>
  )
}

export default homePage
