// Layout.tsx
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { User } from "firebase/auth";

// passing throught props and defining its types
interface LayoutProps {
  children: React.ReactNode;
  authUser: User | null;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Layout: React.FC<LayoutProps> = ({children, authUser, setAuthUser,}: LayoutProps) => {

    // setting the state of the activeTab, default is "home", getting the activeTab from localStorage
    const [activeTab, setActiveTab] = useState(() => {
      const savedTab = localStorage.getItem("activeTab");
      return savedTab || "home"; // 
    });

    // updating the state activeTab when activeTab changes
    const handleTabClick = (tabName: string) => {
      // Set the active tab and save it to localStorage
      setActiveTab(tabName);
      localStorage.setItem('activeTab', tabName);
    };

    return (
      // layout for the components
      <div className="recipes-page-container">
        <Navbar authUser={authUser} handleTabClick={handleTabClick}/>
        <Sidebar authUser={authUser} setAuthUser={setAuthUser} setActiveTab={setActiveTab} activeTab={activeTab} handleTabClick={handleTabClick}/>
        {children}
      </div>
    );
};

export default Layout;