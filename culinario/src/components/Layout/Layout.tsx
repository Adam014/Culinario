// Layout.tsx
import { useState } from "react";
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

    return (
      <div className="recipes-page-container">
        <Navbar authUser={authUser} setActiveTab={setActiveTab} />
        <Sidebar authUser={authUser} setAuthUser={setAuthUser} setActiveTab={setActiveTab} activeTab={activeTab} />
        {children}
      </div>
    );
};

export default Layout;