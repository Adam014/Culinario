// Layout.tsx
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { User } from "firebase/auth";

interface LayoutProps {
  children: React.ReactNode;
  authUser: User | null;
  setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
  toggleProfile: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  authUser,
  setAuthUser,
  toggleProfile,
}: LayoutProps) => {
  return (
    <div className={authUser ? "recipes-page-container" : "container"}>
      <Navbar authUser={authUser} toggleProfile={toggleProfile} />
      <Sidebar authUser={authUser} setAuthUser={setAuthUser} />
      {children}
    </div>
  );
};

export default Layout;