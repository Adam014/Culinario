import { User } from "firebase/auth";

interface NavbarProps {
  authUser: User | null; // Define the type for authUser
}

const main = ({ authUser } : NavbarProps) => {
  return (
    <main className="main">
      <div className="welcome-title">
        <h1>Welcome back {authUser?.email}</h1>
        <h2>What are you cooking today?</h2>
      </div>
    </main>
  )
}

export default main
