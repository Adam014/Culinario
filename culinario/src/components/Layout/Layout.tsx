// Layout.tsx
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { User } from "firebase/auth";

interface LayoutProps {
  children: React.ReactNode;
  authUser: User | null;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Layout: React.FC<LayoutProps> = ({children, authUser, setAuthUser,}: LayoutProps) => {
    const [activeTab, setActiveTab] = useState(() => {
      const savedTab = localStorage.getItem("activeTab");
      return savedTab || "home"; // Use the saved value or default to "home"
    });

    useEffect(() => {
      localStorage.setItem("activeTab", activeTab); // Update localStorage when activeTab changes
    }, [activeTab]);

    const handleTabClick = (tabName: string) => {
      // Set the active tab and save it to localStorage
      setActiveTab(tabName);
      localStorage.setItem('activeTab', tabName);
    };

    return (
      <div className="recipes-page-container">
        <Navbar authUser={authUser} handleTabClick={handleTabClick}/>
        <Sidebar authUser={authUser} setAuthUser={setAuthUser} setActiveTab={setActiveTab} activeTab={activeTab} handleTabClick={handleTabClick}/>
        {children}
      </div>
    );
};

export default Layout;